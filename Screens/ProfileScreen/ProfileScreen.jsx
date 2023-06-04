import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";

import { selectPosts } from "../../Redux/post/postsReucer.js";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../componets/PostCard/PostCard.jsx";
import { selectUser } from "../../Redux/auth/authReducer.js";
import { authSignOutUser } from "../../Redux/auth/authOperations.js";

export default function ProfileScreen() {
  const { id, login, avatar } = useSelector(selectUser);
  const { height, width } = useWindowDimensions();
  const allPosts = useSelector(selectPosts);
  const posts = allPosts?.filter((post) => post.userId === id);

  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authSignOutUser());
  };

  console.log(avatar);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{ ...styles.image, width: width, height: height }}
        source={require("../../assets/images/photoBG.jpg")}
      >
        <View style={styles.form}>
          <View style={styles.avatar}>
            <Image style={styles.avatarImg} source={{ uri: avatar }} />
            <TouchableOpacity
              style={{
                ...styles.avatarBtn,
                borderColor: avatar ? "#e8e8e8" : "#FF6C00",
                transform: [
                  ...styles.avatarBtn.transform,
                  avatar ? { rotate: "45deg" } : { rotate: "0deg" },
                ],
              }}
              // onPress={}
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
            onPress={logOut}
          >
            <Feather name="log-out" style={styles.logOutIcon} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{login}</Text>
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
    marginTop: 72,
    marginBottom: 12,
  },
  headerTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
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
