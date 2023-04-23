import React, { useCallback, useState } from "react";
import { View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./Screnns/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screnns/RegistrationScreen/RegistrationScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  //   console.log(Platform.OS);
  const [loginScreen, setLoginScreen] = useState(true);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const changeScreen = () => {
    setLoginScreen(!loginScreen);
  };

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {loginScreen ? (
        <LoginScreen onClick={changeScreen} />
      ) : (
        <RegistrationScreen onClick={changeScreen} />
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
