import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { TodoEntryOutput, TodoState } from '@la-sectoblique/septoblique-service/dist/types/models/Todo';
import { AntDesign } from '@expo/vector-icons';
import { deleteTodoEntry, updateTodoEntry } from '@la-sectoblique/septoblique-service';
import Toast from "react-native-toast-message"

import RadioForm from 'react-native-simple-radio-button';
import ApiError from '@la-sectoblique/septoblique-service/dist/types/errors/ApiError';
interface EntryProps {
    todo: TodoEntryOutput,
    refresh: () => void
}

export const Todo = ({todo, refresh}: EntryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<TodoState>(todo.state);

    type Items = {
        label: string,
        value: TodoState
    }
    const items: Items[] = [
        { label: "A faire", value: TodoState.TODO },
        { label: "En cours", value: TodoState.DOING },
        { label: "Fini", value: TodoState.DONE },
    ];

    const onPress = (todo: TodoEntryOutput) => {
        deleteTodoEntry(todo.id)
        .then(() => refresh())
    }
    const update = (todo: TodoEntryOutput, value: TodoState) => {
        updateTodoEntry(todo.id, {state: value})
        .then((res: TodoEntryOutput) => {
            Toast.show({
                type: 'success',
                text1: res.title,
                text2: "Passe à l'état: " + res.state
              })
        })
        .catch((err: ApiError) => {
            Toast.show({
                type: 'error',
                text1: err.name,
                text2: err.code + " " + err.message
              })
        })
    }

    return (
        <View style={{
            width: "95%", 
            padding: 5, 
            margin: 5, 
            borderWidth: 1, 
            borderRadius: 10,
            backgroundColor: "rgba(27,145,191, 0.5)", 
            borderColor: "rgba(27,145,191, 0.5)",
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        }}
        >
            <Text style={{width: "100%", textDecorationLine: "underline"}}>{todo.title}:</Text>
            <View style={{justifyContent: 'center',}}>
                <RadioForm
                    radio_props={items}
                    initial={todo.state == TodoState.TODO ? 0 : todo.state == TodoState.DOING ? 1 : 2}
                    formHorizontal={true}
                    buttonColor={'#365359'}
                    selectedButtonColor={'#365359'}
                    selectedLabelColor={'#365359'}
                    labelColor={'#365359'}            
                    onPress={(value: TodoState) => {update(todo, value)}}
                />
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "#1B91BF",
                    padding: 5,
                    margin: 5,
                    borderRadius: 10
                }}
                onPress={() => onPress(todo)}
            >
                <AntDesign name="delete" size={32} color="white" />
            </TouchableOpacity>
        </View>
    )
}


