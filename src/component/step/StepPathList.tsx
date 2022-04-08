import { getPathById } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { PathOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Path';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { useEffect, useState } from 'react';
import { LatLng, Polyline } from 'react-native-maps'
import { PathDetails } from '../path/PathDetails';

interface StepPathListProps {
    steps: StepOutput[], 
}

export const StepPathList = (props: StepPathListProps) => {

    const [origin, setOrigin] = useState<StepOutput>({} as StepOutput);
    const [path, setPath] = useState<PathOutput>();

    const handleClick = (step: StepOutput) => {
      console.log(step.pathId)
      if(step.pathId == null)
        return
      setOrigin(step)
        
      getPathById(step.pathId)
      .then((res: PathOutput) => setPath(res))
      .catch((err: ApiError) => console.log(err))

    }

    if(props.steps.length == 0)
      return <></>

    if(path != null)
      return <PathDetails origin={origin} path={path}/>

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
                  strokeColor= {"blue"}
                  strokeWidth={6}
                  tappable={true}
                  onPress={(event) => { handleClick(step)}}
              />
              })

            }
        </>
    )
}