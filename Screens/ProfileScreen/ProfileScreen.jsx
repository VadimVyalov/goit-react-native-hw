import { Feather } from "@expo/vector-icons";

import React, { useState, useEffect, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  useWindowDimensions,
  FlatList,
  SafeAreaView,
} from "react-native";

import { selectPosts } from "../../Redux/post/postsReucer.js";
import { useSelector } from "react-redux";
import { PostCard } from "../../componets/PostCard/PostCard.jsx";

export default function ProfileScreen({ onClick }) {
  const [avatar, setAvatar] = useState(false);
  const { height, width } = useWindowDimensions();
  const navigation = useNavigation();
  const posts = useSelector(selectPosts);

  const addAvatar = () => {
    setAvatar(!avatar);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ ...styles.image, width: width, height: height }}
        source={require("../../assets/images/photoBG.jpg")}
      >
        <View style={styles.form}>
          <View style={styles.avatar}>
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
              <Feather
                name="plus"
                size={16}
                color={avatar ? "#bdbdbd" : "#FF6C00"}
              ></Feather>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.logOutBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Feather name="log-out" style={styles.logOutIcon} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>User Name</Text>
          </View>
          <SafeAreaView style={{ paddingBottom: 296 }}>
            <FlatList
              style={{ paddingTop: 16 }}
              data={posts}
              keyExtractor={(post) => post.id}
              renderItem={(post) => <PostCard post={post.item} />}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  image: {
    resizeMode: "cover",
  },

  form: {
    // gap: 16,
    backgroundColor: "#fff",
    marginTop: 110,
    padding: 16,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },

  logOutBtn: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  logOutIcon: {
    fontSize: 20,
    color: "#BDBDBD",
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
    // marginVertical: 16,
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
