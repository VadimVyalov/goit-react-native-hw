import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../config";

const [image, setImage] = useState(null);
const [uploading, setUploading] = useState(false);

const UploadScreen = () => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const source = { uri: result.assets[0].uri };
        console.log(source);
        setImage(source);
    };
}
  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    var ref = firebase.storage().ref().child(filename).put(blob);
    try {
      await ref;
    } catch (e) {
      console.log(e);
    }
    setUploading(false);
    Alert.alert("Photo uploaded!");
    setImage(null);
  };

  return <SafeAreaView>// view will go here</SafeAreaView>;
};

export default UploadScreen;
