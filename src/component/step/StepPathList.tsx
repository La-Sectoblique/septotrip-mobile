import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { LatLng, Polyline } from 'react-native-maps'

interface StepPathListProps {
    steps: StepOutput[], 
}

export const StepPathList = (props: StepPathListProps) => {


    if(props.steps.length == 0)
      return <></>

    return (
        <>
            {
              props.steps.map((step: StepOutput,i: number, steps: StepOutput[]) => {
                if(i == steps.length - 1)
                  return 
                  
                return <Polyline
                  key={step.id}
                  coordinates={[
                    {
                      longitude: step.localisation.coordinates[0], 
                      latitude: step.localisation.coordinates[1]
                    } as LatLng,
                    {
                      longitude: steps[i + 1].localisation.coordinates[0],
                      latitude: steps[i + 1].localisation.coordinates[1],

                    } as LatLng
                    
                  ]}
                  strokeColor= {i%2 ? "red": "blue"}
                  strokeWidth={6}
                  tappable={true}
                  onPress={(e) => {alert("Tu viens de cliquer sur une route")}}
              />
              })

            }
        </>
    )
}