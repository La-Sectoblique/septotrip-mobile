import { addPoint, addStep, addTravelerToTrip, createTrip, getUserTrips } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { TripOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Trip';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text } from 'react-native';
import useTrips from '../../hook/useTrips';


export const DebugScript: React.FC = ({navigation}: any) => {
    const [trips, initTrip, addTrip, removeTrip] = useTrips();


    useEffect(() => {
        getUserTrips()
        .then((res : TripOutput[]) => initTrip(res))
        .catch((err: ApiError) => console.error(err))
    }, [])

    async function addData() {
        if(trips.length > 0){
            alert("Vous avez déjà des données en place, nous ne pouvons pas effectuez les prochaine tache")
            return
        }

        const trip = await createTrip({ name: "Go to Korea", visibility: 'private'})
        console.log("trip created: " + trip.name)
        const step_capital = await addStep(trip.id, 
            {   
                duration: 3, 
                localisation: {
                    coordinates: [126.9779692, 37.566535],
                    type: 'Point'
                }, 
                name: "La capital !", 
                order: 1
            })
        console.log("step created: " + step_capital.name)

        const poi_one_capital = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [126.812229, 37.5797527],
                    type: 'Point'
                },
                title: "Aéroport ++",
            })
        console.log("poi created: " + poi_one_capital.title)

        const poi_two_capital = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [126.9882642, 37.5512474],
                    type: 'Point'
                },
                title: "Cherry Blossom on a Tower",
            })
        console.log("poi created: " + poi_two_capital.title)

        
        const poi_three_capital = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [126.97928, 37.5729],
                    type: 'Point'
                },
                title: "Village Traditionnel",
            })
        console.log("poi created: " + poi_three_capital.title)

        
        const poi_four_capital = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [126.9802088, 37.5237353],
                    type: 'Point'
                },
                title: "Et pourquoi pas un musée",
            })
        console.log("poi created: " + poi_four_capital.title)

        const poi_five_capital = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [126.9768293, 37.5759183],
                    type: 'Point'
                },
                title: "Zolie maison",
            })
        console.log("poi created: " + poi_five_capital.title)

    
        const step_busan = await addStep(trip.id, 
            {   
                duration: 4, 
                localisation: {
                    coordinates: [129.0756416, 35.1795543],
                    type: 'Point'
                }, 
                name: "Busan", 
                order: 2
            })
        console.log("step created: " + step_busan.name)


        const poi_one_busan = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [129.1569029, 35.1575188],
                    type: 'Point'
                },
                title: "Détente à la plage",
            })
        console.log("poi created: " + poi_one_busan.title)

       
        const poi_two_busan = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [129.0876858, 35.05851],
                    type: 'Point'
                },
                title: "Je sais pas, on m'a dit c'était cool",
            })
        console.log("poi created: " + poi_two_busan.title)

        
        const poi_three_busan = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [129.0937013, 35.1287583],
                    type: 'Point'
                },
                title: "Devoir de mémoire",
            })
        console.log("poi created: " + poi_three_busan.title)

        
        const poi_four_busan = await addPoint(trip.id, 
            {
                localisation: {
                    coordinates: [129.0189569, 35.0771621],
                    type: 'Point'
                },
                title: "Téléphérique à l'étranger",
            })
        console.log("poi created: " + poi_four_busan.title)


        const step_ile = await addStep(trip.id, 
            {   
                duration: 2, 
                localisation: {
                    coordinates: [126.40748, 33.258747],
                    type: 'Point'
                }, 
                name: "C'est une bien belle île ", 
                order: 3
            })
        console.log("step created: " + step_ile.name)

        
        console.log("Data finish")
        

        
    }
    return (
       <TouchableOpacity
        onPress={(event) => {addData()}}
        >
           <Text style={{textAlign: "center", marginVertical: 10, borderWidth: 1, paddingVertical: 5}}>Clique to add data</Text>
        </TouchableOpacity>
    );
};


