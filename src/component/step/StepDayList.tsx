import { getStepDays } from '@la-sectoblique/septoblique-service';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';

import { PointDayList } from '../point/PointDayList';

interface StepDayListProps {
    step: StepOutput
}

export const StepDayList = ({ step }: StepDayListProps) => {
    const [days, setDays] = useState<DayOutput[]>([] as DayOutput[])
    useEffect(() => {
        getStepDays(step.id)
        .then((days: DayOutput[]) => {
            setDays(days)
        })
        .catch((err: ApiError) => {
            console.log(JSON.stringify(err))
        })
        
    }, [])

    if(days.length < 1)
        return <Text>Aucun jour disponible</Text>
        
    return (
          <View style={{}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20}}>{step.order}: {step.name}</Text>
              <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around'}}>
              {
                  days.map((day) => {
                      return <View key={day.id} style={{borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, width: "40%"}}>
                      <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}>Jour: {day.number}</Text>
                      <PointDayList day={day} />
                      </View>
                  })
              }
              </View>
          </View>
    )
}