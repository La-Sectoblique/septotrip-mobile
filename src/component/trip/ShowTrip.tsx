import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Dimensions} from "react-native"
import MapView from "react-native-maps"


import { getStepPoints, getTripPoints, getTripSteps } from "@la-sectoblique/septoblique-service"

import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step"
import { TripOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Trip"
import { LocalisationPoint, PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point"
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError"

import useSteps from "../../hook/useSteps"

import { StepMarkerList } from "../step/StepMarkerList"
import { StepList } from "../step/StepList"
import { StepPathList } from "../step/StepPathList"
import { StepDetails } from "../step/StepDetails"
import { PointMarkerList } from "../point/PointMarkerList"
import usePoints from "../../hook/usePoints"
import { Dropdown } from "../utils/Dropdown"
import { dropdownItem } from "../../models/DropdownItem"

interface TripListProps {
    trip: TripOutput,
}

export const ShowTrip = (props: TripListProps) => {
    const [steps, initStep, addStep, removeStep] = useSteps();


    const [activeElement, setActiveElement] = useState<StepOutput>();
    const [modalStepVisible, setModalStepVisible] = useState<boolean>(true);

    const [filter, setFilter] = useState<string>('all');

    const [points, initPoint, addPoint, removePoint] = usePoints();
    //Default center the map on Paris coordinate
    const [focus, setFocus] = useState<LocalisationPoint>({type: "Point", coordinates: [2.349014, 48.864716]});
    const [loading, setLoading] = useState<boolean>(false)
    
    const styles = StyleSheet.create({
        container: {
            height: 300,
            width: Dimensions.get("window").width,
            backgroundColor: 'tomato'
          },
          map: {
            flex: 1
          },
        
    });

    useEffect(() => {
        setLoading(true)
       

        getTripSteps(props.trip.id)
        .then((res: StepOutput[]) => {
            initStep(res)
            if(res.length > 0)
                setFocus({type: "Point", coordinates: res[0].localisation.coordinates })
        })
        getTripPoints(props.trip.id) .then((res: PointOutput[]) => initPoint(res))
        .catch((err: ApiError) => console.log(JSON.stringify(err)))
        .finally(() => setLoading(false))
    },[])

    if(loading)
        return <Text>ça charche bg tkt</Text>

    return (
        <View>
            <Text>Nom du voyage : {props.trip.name}</Text>
            
            <StepDetails step={activeElement} modalVisible={modalStepVisible} setModalVisible={setModalStepVisible}/>
            <Text>{filter}</Text>
            <Dropdown items={[
                {label: "Etape", value: "step"},
                {label: "Point d'intérêts", value: "point"},
                {label: "Tout", value: "all"}
            ]} 
            setCurrentValue={setFilter} 
            currentValue={filter}/>
            <View style={styles.container}>
                <MapView 
                    style={styles.map} 
                    rotateEnabled={false} 
                    provider={null} 
                    showsUserLocation={true} 
                    loadingEnabled={true} 
                    initialRegion={{latitude: focus.coordinates[1], longitude: focus.coordinates[0], latitudeDelta: 50, longitudeDelta: 50}}
                >   
                    {filter == 'step' || filter == 'all' 
                    ?
                         <>
                         <StepMarkerList steps={steps} />
                         <StepPathList steps={steps} />
                         </>
                    :
                    <></>
                    }

                    {filter == 'point' || filter == 'all' 
                    ?
                        <PointMarkerList points={points} />
                    :
                        <></>
                    }
                   

                </MapView>
            </View>
            <StepList steps={steps}></StepList>
        </View>
    )
}
