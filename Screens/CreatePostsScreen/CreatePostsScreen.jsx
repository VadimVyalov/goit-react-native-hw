import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";

const initialState = {
  locationTitle: "",
  photoTitle: "",
};

export default function RegistrationScreen({ onClick }) {
  const [state, setstate] = useState(initialState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height - 430);
      // console.log(e);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const sendPost = () => {
    Keyboard.dismiss();
    console.log(state);
    setstate(initialState);
    navigation.navigate("Home");
  };

  const addAvatar = () => {
    setAvatar(!avatar);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          style={{
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View
            style={{
              ...styles.form,
              marginBottom: keyboardHeight,
              width: width,
              height: height - 132,
            }}
          >
            <View>
              <View style={styles.photo}>
                <TouchableOpacity style={styles.takePhoto}>
                  <Feather name="camera" color="#BDBDBD" size={24} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.loadPhoto}>
                <Text style={styles.photoTitle}>Завантажте фото</Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  value={state.photoTitle}
                  onChangeText={(value) =>
                    setstate((prevState) => ({
                      ...prevState,
                      photoTitle: value,
                    }))
                  }
                  placeholder="Назва..."
                  placeholderTextColor="#BDBDBD"
                  textAlign={"left"}
                />
              </View>

              <View style={{ ...styles.inputContainer, paddingLeft: 28 }}>
                <TextInput
                  value={state.locationTitle}
                  onChangeText={(value) =>
                    setstate((prevState) => ({
                      ...prevState,
                      locationTitle: value,
                    }))
                  }
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  textAlign={"left"}
                />
                <TouchableOpacity style={styles.locationBtn}>
                  <SimpleLineIcons
                    style={styles.locationIcon}
                    name="location-pin"
                    onPress={() => navigation.navigate("MapScreen")}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={sendPost}
                // disabled={true}
              >
                <Text style={styles.btnTitle}>Опублікувати</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!keyboardHeight && (
            <TouchableOpacity style={styles.btnDelete}>
              <Feather name="trash-2" size={24} color={"#bdbdbd"}></Feather>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  form: {
    backgroundColor: "#fff",
    padding: 16,
    paddingBottom: 24,
  },

  inputContainer: {
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
    height: 50,

    justifyContent: "center",
  },
  locationIcon: {
    alignItems: "center",
    fontSize: 20,
    color: "#BDBDBD",
    transform: [{ scaleX: 1.1 }],
  },

  locationBtn: { position: "absolute" },

  btn: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#FF6C00",
    height: 48,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
  },

  btnDelete: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    height: 40,
    width: 70,
    //marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  btnTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },

  photoTitle: {
    paddingTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  photo: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhoto: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,

    backgroundColor: "#fff",
    position: "absolute",
  },
  loadPhoto: {
    width: "50%",
    paddingBottom: 32,
  },
});
