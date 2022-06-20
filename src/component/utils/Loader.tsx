import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Loader = (): JSX.Element => {
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator size="large" color="#0869A6" style={{width: "100%", height: "100%"}} />
    </View>
    );
};
