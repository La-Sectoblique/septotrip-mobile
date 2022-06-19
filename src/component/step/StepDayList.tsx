import { getStepDays, getTripById } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import { TripOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Trip';
import React, { useEffect, useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native';

import { PointDayList } from '../point/PointDayList';
import { Loader } from '../utils/Loader';

interface StepDayListProps {
    step: StepOutput
    gotoMap: (arg0: PointOutput | StepOutput) => void,
    started_trip: boolean,
}

export const StepDayList = ({ step, gotoMap, started_trip, }: StepDayListProps) => {
    const [days, setDays] = useState<DayOutput[]>([] as DayOutput[]);
    const [start_date, setStartDate] = useState<Date>({} as Date);
    const [loading, setLoading] = useState<boolean>(true)

    const handleClick = (step: StepOutput): void => {
        gotoMap(step)
    }
    const prettierDate = (start_date: Date, day_number: number) => {
        const date_number = new Date(start_date).getDate();
        const delayed_date = new Date(start_date).setDate(date_number + day_number)
        const final_date_format = new Date(delayed_date);
        return final_date_format.toLocaleDateString()
    }

    useEffect(() => {
        const get_trip = getTripById(step.tripId)
        .then((trip: TripOutput) => {
            if(trip.startDate !== undefined)
                setStartDate(trip.startDate)
        }) 
        .catch((err: ApiError) => {
            console.log(err)
        })

        const step_days = getStepDays(step.id)
        .then((days: DayOutput[]) => {
            setDays(days)
        })
        .catch((err: ApiError) => {
            console.log(JSON.stringify(err))
        })

        Promise.all([get_trip, step_days])
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
        
    }, [])

    if(loading)
        return <Loader />

    if(days.length < 1)
        return <Text>Aucun jour disponible</Text>
     
    return (
          <View style={{}}>
                <TouchableHighlight
                    underlayColor="#ccc"
                    onPress={() =>
                        handleClick(step)
                    }
                >
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20}}>{step.order}: {step.name}</Text>
                </TouchableHighlight>
              
              <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around'}}>
              {
                  days.map((day) => {
                    const date = prettierDate(start_date, day.number);

                    // if(i === days.length - 1)
                    //     setBeginDate(new Date(date))

                      return <View key={day.id} style={{borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, width: "40%"}}>
                      {!started_trip && <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}>Jour: {day.number}</Text> }
                      {started_trip && <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}>{ date }</Text> }
                      <PointDayList day={day} gotoMap={gotoMap}/>
                      </View>
                  })
              }
              </View>
          </View>
    )
}


