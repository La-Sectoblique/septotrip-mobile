import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { TodoEntryOutput, TodoState } from '@la-sectoblique/septoblique-service/dist/types/models/Todo';
import { AntDesign } from '@expo/vector-icons';
import { deleteTodoEntry } from '@la-sectoblique/septoblique-service';
import DropDownPicker from 'react-native-dropdown-picker';

interface EntryProps {
    todo: TodoEntryOutput,
    refresh: () => void
}

export const Todo = ({todo, refresh}: EntryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<TodoState>(todo.state);
    const items = [
        { label: "A faire", value: TodoState.TODO },
        { label: "En cours", value: TodoState.DOING },
        { label: "Fini", value: TodoState.DONE },
    ];

    const onPress = (todo: TodoEntryOutput) => {
        deleteTodoEntry(todo.id)
        .then(() => refresh())
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
            flexWrap: 'wrap'
        }}
        >
            <Text style={{width: "100%"}}>{todo.title}:</Text>

            <DropDownPicker
                open={open}
                value={currentValue}
                items={items}
                setOpen={setOpen}
                setValue={setCurrentValue}
            />

            <TouchableOpacity
                style={{
                    backgroundColor: "#1B91BF",
                    marginLeft: 5,
                }}
                onPress={() => onPress(todo)}
            >
                <AntDesign name="delete" size={32} color="white" />
            </TouchableOpacity>
        </View>
    )
}


