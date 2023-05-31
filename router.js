import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import Home from "./Screens/Home/Home";
import MapScreen from "./Screens/MapScreen/MapScreen";
import CommentsScreen from "./Screens/CommentsScreen/CommentsScreen";

export const privateRoute = (isAuth) => {
  const MainStack = createStackNavigator();

  if (!isAuth) {
    return (
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
      </MainStack.Navigator>
    );
  }
  return (
    <MainStack.Navigator initialRouteName="Home">
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
          headerTitleAlign: "center",
        }}
      />
    </MainStack.Navigator>
  );
};
