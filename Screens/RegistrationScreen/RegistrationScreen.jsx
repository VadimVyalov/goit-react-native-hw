import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import InputEmail from "../../componets/InputEmail";
import InputPassword from "../../componets/InputPassword";
import { authSignUpUser } from "../../Redux/auth/authOperations";
const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegistrationScreen() {
  const [state, setstate] = useState(initialState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [avatar, setAvatar] = useState(false);
  const { height, width } = useWindowDimensions();
  const land = height > width;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height - 226);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const sendLogin = () => {
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
  };

  const addAvatar = async () => {
    if (avatar) {
      setstate((prevState) => ({
        ...prevState,
        avatar: "",
      }));
      setAvatar(false);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setstate((prevState) => ({
        ...prevState,
        avatar: result.assets[0].uri,
      }));
      setAvatar(true);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                marginBottom: keyboardHeight,
                paddingBottom: land ? 112 : 32,
                width: land ? "100%" : "50%",
              }}
            >
              <View style={styles.avatar}>
                {avatar && (
                  <Image
                    style={styles.avatarImg}
                    source={{ uri: state.avatar }}
                  />
                )}
                <TouchableOpacity
                  style={{
                    ...styles.avatarBtn,
                    borderColor: avatar ? "#e8e8e8" : "#FF6C00",
                    transform: [
                      ...styles.avatarBtn.transform,
                      avatar ? { rotate: "45deg" } : { rotate: "0deg" },
                    ],
                  }}
                  onPress={addAvatar}
                >
                  <AntDesign
                    name="plus"
                    size={16}
                    color={avatar ? "#bdbdbd" : "#FF6C00"}
                  ></AntDesign>
                </TouchableOpacity>
              </View>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Реєстрація</Text>
              </View>
              <InputEmail
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, login: value }))
                }
                value={state.login}
                placeholder="Введіть логін"
                //onFocus={null}
              />
              <InputEmail
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, email: value }))
                }
                value={state.email}
                placeholder="Адреса електронної пошти"
                //onFocus={null}
              />
              <InputPassword
                onChangeText={(value) =>
                  setstate((prevState) => ({ ...prevState, password: value }))
                }
                value={state.password}
                // onFocus={null}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={sendLogin}
                // disabled={true}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.btnDown}>Вже маєш акаунт? Увійти</Text>
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

    position: "absolute",
    left: 0,
    top: 0,
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
    marginTop: 72,
    marginBottom: 12,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
    position: "absolute",
    left: "50%",
    alignItems: "center",
    transform: [{ translateY: -60 }, { translateX: -44 }],
    // overflow: "hidden",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  avatarBtn: {
    width: 24,
    height: 24,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
    position: "absolute",
    right: 0,
    bottom: 0,
    transform: [{ translateY: -14 }, { translateX: 12 }],
  },
});
