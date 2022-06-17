import { getStepById, getTripFiles } from "@la-sectoblique/septoblique-service";
import ApiError from "@la-sectoblique/septoblique-service/dist/types/errors/ApiError";
import { FileMetadataOutput } from "@la-sectoblique/septoblique-service/dist/types/models/File";
import { PathOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Path";
import { StepOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Step";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, {
  LatLng,
  Marker,
  Polyline,
} from "react-native-maps";
import { FileList } from "../trip/FileList";
import { Loader } from "../utils/Loader";

interface PathDetailsProps {
  origin: StepOutput;
  path: PathOutput;
}

export const PathDetails = (props: PathDetailsProps) => {
  const [destination, setDestination] = useState<StepOutput>({} as StepOutput);
  const [loading, setLoading] = useState<boolean>(true);

  const [latitudeDelta, setLatitudeDelta] = useState<number>(0);
  const [longitudeDelta, setLongitudeDelta] = useState<number>(0);

  const [files, setFiles] = useState<FileMetadataOutput[]>([] as FileMetadataOutput[])


  
  useEffect(() => {
    const step_id = getStepById(props.path.destinationId)
      .then((res: StepOutput) => {

        setLongitudeDelta(Math.abs(res.localisation.coordinates[0] - props.origin.localisation.coordinates[0]))
        setLatitudeDelta(Math.abs(res.localisation.coordinates[1] - props.origin.localisation.coordinates[1]))
        
        setDestination(res)
      })
      .catch((err: ApiError) => {
        console.log(err)
      })
    
    const trip_files = getTripFiles(props.origin.tripId, {path: props.path.id})
    .then((res: FileMetadataOutput[]) => setFiles(res))

    Promise.all([step_id, trip_files])
    .then(() => setLoading(false))
    .catch(() => setLoading(false))

  }, []);

  if (loading) return <Loader />;

  return (
    <View style={{width: Dimensions.get('window').width * 75 / 100}}>
      <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 20}}>{`${props.origin.name} - ${destination.name}`}</Text>

      <MapView
        rotateEnabled={false}
        provider={null}
        showsUserLocation={true}
        style={{
          width: (Dimensions.get("window").width * 50) / 100,
          height: (Dimensions.get("window").width * 50) / 100,
        }}
        loadingEnabled={true}
        initialRegion={{
          latitude: props.origin.localisation.coordinates[1],
          longitude: props.origin.localisation.coordinates[0],
          latitudeDelta: latitudeDelta*5,
          longitudeDelta: longitudeDelta*5,
        }}
      >
        <Marker
          key={props.origin.id}
          coordinate={
            {
              longitude: props.origin.localisation.coordinates[0],
              latitude: props.origin.localisation.coordinates[1],
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
              longitude: props.origin.localisation.coordinates[0],
              latitude: props.origin.localisation.coordinates[1],
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
      <Text style={{margin: 10}}>{ props.path.description }</Text>
      {
            files.length > 0 
            ? <FileList files={files} showWebView={false}/>
            // eslint-disable-next-line react/no-unescaped-entities
            : <Text style={{textAlign: "center", margin: 5}}>Aucun fichier n'est lié à cette étape</Text>
      }
    </View>
  );
};
