import React, { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import i18n from './i18n';

import * as SecureStore from "expo-secure-store";

import { Login } from "./src/pages/Login";
import { Register } from "./src/pages/Register";
import { TripList } from "./src/component/trip/TripList";

import { init, Platform } from "@la-sectoblique/septoblique-service";

import { TripNavigation } from "./src/navigation/TripNavigation";
import { RootStackParamList } from "./src/models/NavigationParamList";
import { Loader } from "./src/component/utils/Loader";

export default function App() {
  init({
    url: "https://api.septotrip.com",
    getToken: async () => {
      const get_auth = await SecureStore.getItemAsync("token");
      if (!get_auth) {
        return "";
      }

      return get_auth;
    },
    storeToken: async (token: string) => {
      await SecureStore.setItemAsync("token", token);
    },
    platform: Platform.MOBILE,
    context: "development",
  });

  const initI18n = i18n;

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
      <Suspense fallback={Loader}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Planification" component={TripNavigation} />
            <Stack.Screen name="TripList" component={TripList} />
          </Stack.Navigator>
        </NavigationContainer>
      </Suspense>
  );
}
