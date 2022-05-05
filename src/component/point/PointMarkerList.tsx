import { PointOutput } from "@la-sectoblique/septoblique-service/dist/types/models/Point";
import { LatLng, Marker } from "react-native-maps";

interface PointMarkerListProps {
  points: PointOutput[];
}

export const PointMarkerList = (props: PointMarkerListProps) => {
  if (props.points.length == 0) return <></>;

  return (
    <>
      {props.points.map((point: PointOutput, i: number) => {
        return (
          <Marker
            key={point.id}
            coordinate={
              {
                longitude: point.localisation.coordinates[0],
                latitude: point.localisation.coordinates[1],
              } as LatLng
            }
            pinColor="blue"
            onPress={() => {
              alert(
                "Point d'intérêt: \n" + point.title + "\n\n" + point.description
              );
            }}
          />
        );
      })}
    </>
  );
};
