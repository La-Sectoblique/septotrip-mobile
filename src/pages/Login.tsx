import { PointOutput } from '@la-sectoblique/septoblique-service/dist/types/models/Point'

import React, { useEffect, useState } from 'react'
import { StyleSheet, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';

import { getUserPoints } from '@la-sectoblique/septoblique-service';

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    
  });
  
export const Login = () => {


    return (
        <SafeAreaView style={styles.page}>
        
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}