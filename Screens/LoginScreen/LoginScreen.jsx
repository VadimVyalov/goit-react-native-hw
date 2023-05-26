import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import InputEmail from "../../componets/InputEmail";
import InputPassword from "../../componets/InputPassword";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ onClick }) {
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setstate] = useState(initialState);
  // const [dimensions, setdimensions] = useState(Dimensions.get("window").width);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { height, width } = useWindowDimensions();
  const land = height > width;
  const navigation = useNavigation();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      //   setIsShowKeyboard(true);
      setKeyboardHeight(e.endCoordinates.height - 155);
      //  console.log(e);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      // setIsShowKeyboard(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardShow = () => {
    //  setIsShowKeyboard(true);
  };
  const keyboardHide = () => {
    //  setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const sendLogin = () => {
    keyboardHide();
    console.log(state);
    setstate(initialState);
    navigation.navigate("Home")
  };

  //console.log("width: ", width, "  heigth:", height);
  // console.log(keyboardHeight);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{ ...styles.image, width: width, height: height }}
          source={require("../../assets/images/photoBG.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            style={{
              height: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                ...styles.form,
                //marginBottom: isShowKeyboard ? -keyboardHeight + 100 : 0,
                marginBottom: keyboardHeight,
                paddingBottom: land ? 112 : 32,
                width: land ? "100%" : "50%",
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Увійти</Text>
              </View>

              <InputEmail
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
                value={state.email}
                onFocus={keyboardShow}
                placeholder="Адреса електронної пошти"
              />
              <InputPassword
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                value={state.password}
                onFocus={keyboardShow}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={sendLogin}
                // disabled={true}
              >
                <Text style={styles.btnTitle}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
                <Text style={styles.btnDown}>
                  Немає акаунта? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  image: {
    resizeMode: "cover",
    // position: "absolute",
    // left: 0,
    // top: 0,
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },

  form: {
    gap: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },

  btn: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#FF6C00",
    height: 48,
    marginTop: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  header: {
    alignItems: "center",
    marginVertical: 12,
  },
  headerTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  btnDown: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
  },
});
