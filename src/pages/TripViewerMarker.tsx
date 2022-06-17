import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { RootTabParamList } from "../models/NavigationParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PTRView from "react-native-pull-to-refresh";
import { StepList } from "../component/step/StepList";
import { PointList } from "../component/point/PointList";
import { Dropdown } from "../component/utils/Dropdown";
import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import { Loader } from "../component/utils/Loader";
import { getTripPoints, getTripSteps } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";

type TripViewerIMarkerProps = NativeStackScreenProps<RootTabParamList, 'Voyage'>

export const TripViewerMarker: React.FC<TripViewerIMarkerProps> = (props) => {
  const { trip } = props.route.params;
  
  const [filter, setFilter] = useState<string>("");

  const [points, setPoints] = useState<PointOutput[]>([] as PointOutput[])
  const [steps, setSteps] = useState<StepOutput[]>([] as StepOutput[])

  const [loading, setLoading] = useState<boolean>(true)

  const _refresh = () => {
    const trip_step = getTripSteps(trip.id).then((res: StepOutput[]) => {
        setSteps(res);
      });
  
      const trip_point = getTripPoints(trip.id).then((res: PointOutput[]) => {
        setPoints(res);
      });
  
      Promise.all([trip_step, trip_point])
        .then(() => setLoading(false))
        .catch((err: ApiError) => {
          console.log(JSON.stringify(err))
          setLoading(false)
        })
  }

  useEffect(() => {
    _refresh()
  }, [])

  const gotoMap = (point_or_step: PointOutput | StepOutput) => {
    props.navigation.navigate('Carte', {trip: trip, pointToFocus: point_or_step})
  }

  if(loading)
    return <Loader />

  return (
    <PTRView style={{flex: 1}} onRefresh={() => {_refresh()}}>
      <SafeAreaView style={{}}>
      <Dropdown
          items={[
            { label: "Etape", value: "step" },
            { label: "Point d'intérêts", value: "point" },
            { label: "Tout", value: "all" },
          ]}
          setCurrentValue={setFilter}
          currentValue={filter}
          key="dropdown"
        />
      {filter == "step" || filter == "all" ?
        <StepList
          steps={steps}
          gotoMap={gotoMap}
        ></StepList>:
        <PointList
          points={points}
          gotoMap={gotoMap}
        ></PointList>
        }
      </SafeAreaView>
    </PTRView>
  );
};
