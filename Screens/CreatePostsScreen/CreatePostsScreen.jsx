import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as Crypto from "expo-crypto";
import { Camera, CameraType } from "expo-camera";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

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
  Image,
} from "react-native";
import { addPost, deletePost } from "../../Redux/postsSlice";
import { useDispatch } from "react-redux";

export default function RegistrationScreen({ navigation }) {
  const [locationTitle, setLocationTitle] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { height, width } = useWindowDimensions();
  const isFocused = useIsFocused();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    //location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Не має доступу до місцезнаходження");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      try {
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);
      } catch (e) {
        setErrorMsg("Помилка отримання місцезнаходження");
      }
    })();
    //keyboard
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height - 430);
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

    // setstate(initialState);

    // console.log(location);
    dispatch(
      addPost({
        id: Crypto.randomUUID(),
        photo,
        locationTitle,
        photoTitle,
        location,
      })
    );
    navigation.goBack();
  };

  const takePhoto = async () => {
    // console.log("++++");
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
      //console.log("----");
      //await MediaLibrary.createAssetAsync(uri);
    }
  };

  const loadPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //  allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
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
              {isFocused && !photo ? (
                <Camera style={styles.photo} type={type} ref={setCameraRef}>
                  {!permission?.granted ? (
                    <TouchableOpacity
                      style={styles.takePhoto}
                      onPress={() => takePhoto()}
                    >
                      <Feather name="camera" color="#BDBDBD" size={24} />
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.photoTitle}>
                      Нема доступу до камери
                    </Text>
                  )}
                </Camera>
              ) : (
                <View style={styles.photo}>
                  {photo && (
                    <Image
                      source={{ uri: photo }}
                      style={{ height: "100%", width: "100%" }}
                    />
                  )}
                </View>
              )}

              <TouchableOpacity
                style={styles.loadPhoto}
                onPress={() => loadPhoto()}
              >
                <Text style={styles.photoTitle}>
                  {photo ? "Редегувати фото" : "Завантажте фото"}
                </Text>
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  value={photoTitle}
                  onChangeText={(value) => setPhotoTitle(value)}
                  placeholder="Назва..."
                  placeholderTextColor="#BDBDBD"
                  textAlign={"left"}
                />
              </View>

              <View style={{ ...styles.inputContainer, paddingLeft: 28 }}>
                <TextInput
                  value={locationTitle}
                  onChangeText={(value) => setLocationTitle(value)}
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  textAlign={"left"}
                />
                <View style={styles.locationBtn}>
                  <Feather style={styles.locationIcon} name="map-pin" />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  ...styles.btn,
                  backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
                }}
                onPress={sendPost}
                disabled={!photo}
              >
                <Text
                  style={{
                    ...styles.btnTitle,
                    color: photo ? "#ffffff" : "#BDBDBD",
                  }}
                >
                  Опублікувати
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {!keyboardHeight && (
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => dispatch(deletePost())}
            >
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
  photo: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    height: 240,
    backgroundColor: "rgba(232, 232, 232, 1)",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
    borderRadius: 8,
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
  },

  locationBtn: { position: "absolute" },

  btn: {
    borderRadius: 40,
    height: 48,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
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
