import { getStepById, getTripFiles } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Toast from "react-native-toast-message"
import MapView, {
  LatLng,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { FileList } from "../trip/FileList";
import { Loader } from "../utils/Loader";

interface PathDetailsProps {
  origin: StepOutput;
  path: PathOutput;
}

export const PathDetails = ({origin, path}: PathDetailsProps) => {
  const [destination, setDestination] = useState<StepOutput>({} as StepOutput);
  const [loading, setLoading] = useState<boolean>(true);

  const [latitudeDelta, setLatitudeDelta] = useState<number>(0);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0);

  const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[])


  const _refresh = () => {
    const step_id = getStepById(path.destinationId)
      .then((res: StepOutput) => {

        setLongitudeDelta(Math.abs(res.localisation.coordinates[0] - origin.localisation.coordinates[0]))
        setLatitudeDelta(Math.abs(res.localisation.coordinates[1] - origin.localisation.coordinates[1]))
        
        setDestination(res)
      })
      .catch((err: ApiError) => {
        console.error(err)
        Toast.show({
          type: 'error',
          text1: err.name,
          text2: err.code + " " + err.message
        })
      })
    
    const trip_files = getTripFiles(origin.tripId, {path: path.id})
    .then((res: FileMetadataOutput[]) => setFiles(res))
    .catch((err: ApiError) => {
      console.error(err)
      Toast.show({
        type: 'error',
        text1: err.name,
        text2: err.code + " " + err.message
      })
    })

    Promise.all([step_id, trip_files])
    .then(() => setLoading(false))
    .catch(() => setLoading(false))
  }

  useEffect(() => {
    _refresh()
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={{width: Dimensions.get('window').width * 75 / 100, alignItems: "center"}}>
      <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>{`${origin.name} - ${destination.name}`}</Text>

      <MapView
        rotateEnabled={false}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{
          width: (Dimensions.get("window").width * 50) / 100,
          height: (Dimensions.get("window").width * 50) / 100,
        }}
        loadingEnabled={true}
        initialRegion={{
          latitude: origin.localisation.coordinates[1],
          longitude: origin.localisation.coordinates[0],
          latitudeDelta: latitudeDelta*5,
          longitudeDelta: longitudeDelta*5,
        }}
      >
        <Marker
          key={origin.id}
          coordinate={
            {
              longitude: origin.localisation.coordinates[0],
              latitude: origin.localisation.coordinates[1],
            } as LatLng
          }
        />
        <Marker
          key={destination.id}
          coordinate={
            {
              longitude: destination.localisation.coordinates[0],
              latitude: destination.localisation.coordinates[1],
            } as LatLng
          }
        />
        <Polyline
          coordinates={[
            {
              longitude: origin.localisation.coordinates[0],
              latitude: origin.localisation.coordinates[1],
            } as LatLng,
            {
              longitude: destination.localisation.coordinates[0],
              latitude: destination.localisation.coordinates[1],
            } as LatLng,
          ]}
          strokeColor="blue"
          strokeWidth={6}
        />
      </MapView>
      <Text style={{margin: 10}}>{ path.description }</Text>
      {
            files.length > 0 
            ? <FileList files={files} showWebView={false} refresh={_refresh}/>
            // eslint-disable-next-line react/no-unescaped-entities
            : <Text style={{textAlign: "center", margin: 5}}>Aucun fichier n'est lié à cette étape</Text>
      }
    </View>
  );
};
