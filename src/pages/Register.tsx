import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import { register } from '@la-sectoblique/septoblique-service';
import { Credentials } from '@la-sectoblique/septoblique-service/dist/types/utils/Credentials';
import { Error } from '../component/Error';


const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    
  });
  
export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmitButton = () => {
      setLoading(true)
      const data: Credentials = {
        email: email,
        password: password
      }

      //Execute register function after one second to see loading page
      setTimeout(() => {
        register(data)
        .then((res) => setMessage(message))
        .catch((err) => setError("Une erreur est survenue...Veuillez réessayer ultérieurement"))
        .finally(() => setLoading(false))
      }, 1000)
      

    }

    if(loading)
      //TODO: Add Proper loading page
      return <Text>ça charge bg tkt</Text>

    return (
        <SafeAreaView style={styles.page}>
            {
              //TODO: Add TextInput email and password
            }
            <TouchableOpacity activeOpacity={0.5} onPress={handleSubmitButton} style={{borderWidth: 1, paddingHorizontal: 5, paddingVertical: 1}}>
              <Text>S'inscrire</Text>
            </TouchableOpacity>

            <Text>{message}</Text>
            <Error error={error} />
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}