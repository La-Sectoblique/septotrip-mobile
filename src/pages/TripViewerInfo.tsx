import React, { useEffect, useState } from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';


const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    mainContainer: {
      flexDirection: 'row',
    },
    container: {
      height: 150,
      width: Dimensions.get("window").width / 2,
      backgroundColor: 'lightgray',
      padding: 5,
      margin: 5,
      borderRadius: 10,
      flex: 1
    },
    containerTitle: {
      fontSize: 35
    },
    input: {
      borderWidth: 2,
      width: Dimensions.get('window').width,
      paddingVertical: 2,
      paddingLeft: 10,
      marginVertical: 10 
    }
  });
  
export const TripViewerInfo = ({route, navigation}:any) => {

    useEffect(() => { 
    }, [])

    return (
          <SafeAreaView style={styles.page}>
            <View style={styles.mainContainer}>
              <View style={styles.container}>
                  <Text style={styles.containerTitle}>Liste des membres</Text> 
              </View>
              <View style={styles.container}>
                  <Text style={styles.containerTitle}>Liste des taches</Text> 
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.containerTitle}>Liste des points du voyage</Text>
            </View>
            <StatusBar style="auto" />
          </SafeAreaView>
    )
}