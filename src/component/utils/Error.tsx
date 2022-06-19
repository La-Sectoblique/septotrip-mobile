import React from "react";
import { StyleSheet, Text } from "react-native";

interface ErrorProps {
  error: string;
}

export const Error = ({error}: ErrorProps) => {
  if (error.length > 0)
    return <Text style={style.error}>{error}</Text>;
  else return <></>;
};

const style = StyleSheet.create({
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "normal"
  },
});
