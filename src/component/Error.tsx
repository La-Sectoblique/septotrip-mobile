import React from "react";
import { StyleSheet, Text } from "react-native";

interface ErrorProps {
  error: string;
}

export const Error = (props: ErrorProps) => {
  if (props.error.length > 0)
    return <Text style={style.error}>{props.error}</Text>;
  else return <></>;
};

const style = StyleSheet.create({
  error: {
    color: "red",
  },
});
