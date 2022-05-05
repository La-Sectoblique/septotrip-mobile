import * as SecureStore from "expo-secure-store";

import React, { useEffect, useState } from "react";

import { NavigationContainer, ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

export default function AuthNavigation({ navigation }: any) {
  const Tab = createBottomTabNavigator<ParamListBase>();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}
