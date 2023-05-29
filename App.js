import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { View, Button } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import Home from "./Screens/Home/Home";
import MapScreen from "./Screens/MapScreen/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen/CommentsScreen";
import { persistor, store } from "./Redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "react-native-get-random-values";
// SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loader={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: true,
                title: "Мапа",
                headerTitleAlign: "center",
              }}
            />
            <MainStack.Screen
              name="CommentsScreen"
              component={CommentsScreen}
              options={{
                headerShown: true,
                title: "Коментарі",
                //headerTitleStyle: { marginLeft: 70 },
                headerTitleAlign: "center",
              }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
