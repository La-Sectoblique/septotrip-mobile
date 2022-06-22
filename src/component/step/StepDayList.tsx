import { getStepDays, getTripById, getTripSteps } from '@la-sectoblique/septoblique-service';
import { DayOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Day';
import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point';
import { StepOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Step';
import React, { useEffect, useState } from 'react'
import { Text, TouchableHighlight, View } from 'react-native';
import Toast from "react-native-toast-message"

import { PointDayList } from '../point/PointDayList';
import { Loader } from '../utils/Loader';
import { useTranslation } from "react-i18next";

interface StepDayListProps {
    step: StepOutput
    gotoMap: (arg0: PointOutput | StepOutput) => void,
    started_trip: boolean,
}

export const StepDayList = ({ step, gotoMap, started_trip}: StepDayListProps) => {
    const { t, i18n } = useTranslation("locale");
    const [days, setDays] = useState<DayOutput[]>([] as DayOutput[]);
    const [prettier_dates, setPrettierDate] = useState<string[]>([] as string[])
    const [loading, setLoading] = useState<boolean>(true)

    const handleClick = (step: StepOutput): void => {
        gotoMap(step)
    }
    const prettierDate = (start_date: Date | undefined, day_number: number) => {
        if(start_date === undefined)
            return ""
        const date_number = new Date(start_date).getDate();
        const delayed_date = new Date(start_date).setDate(date_number + day_number)
        const final_date_format = new Date(delayed_date);
        return final_date_format.toLocaleDateString()
    }


    const _refresh = async () => {
        try {
            const days = await getStepDays(step.id)
            setDays(days)

            const trip = await getTripById(step.tripId)
            if(!trip)
                return
            
            if(step.order === 0){

                days.map((day,i) => {
                    setPrettierDate((prev) => { prev[i] = prettierDate(trip.startDate, day.number); return prev})
                })
            }
            else {
                const steps = await getTripSteps(trip.id)
                const filtered_steps = steps.filter((value) => value.order < step.order);
                let daysToAdd = 0;
                filtered_steps.map(async (filtered_step) => {
                    const filtered_step_days = await getStepDays(filtered_step.id)
                    daysToAdd += filtered_step_days.length;
                    if(filtered_step.order == step.order - 1){
                        days.map((day,i) => {
                            setPrettierDate((prev) => { prev[i] = prettierDate(trip.startDate, daysToAdd + day.number ); return prev})
                        })
                    }
                })
            }
            setLoading(false)
        }
        catch (err){
            console.error(err)

            Toast.show({
                type: 'error',
                text1: "An error occured"
            })
        }

     
    }

    useEffect(() => {
        _refresh()
    }, [])


    if(loading)
        return <Loader />

    if(days.length < 1)
        return <Text>{t("trip.day")}</Text>
     
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
                  days.map((day, i) => {
                    return <View key={day.id} style={{borderWidth: 1, borderRadius: 15, padding: 10, margin: 10, width: "40%"}}>
                    {!started_trip && <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}>{t("trip.day")} {day.number}</Text> }
                    {started_trip && <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}>{ prettier_dates[i] }</Text> }
                    <PointDayList day={day} gotoMap={gotoMap}/>
                    </View>
                  })
              }
              </View>
          </View>
    )
}


