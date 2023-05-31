import { StyleSheet, SafeAreaView, FlatList } from "react-native";

import React from "react";

import { UserInfo } from "../../componets/UserInfo/UserInfo.jsx";
import { PostCard } from "../../componets/PostCard/PostCard.jsx";
import { selectPosts } from "../../Redux/post/postsReucer.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/auth/authReducer.js";

export default function PostsScreen() {
  const posts = useSelector(selectPosts);
  const { login, email, avatar } = useSelector(selectUser);

  return (
    <SafeAreaView style={styles.container}>
      <UserInfo login={login} email={email} avatar={avatar} />

      <FlatList
        style={{ minHeight: 480, paddingTop: 16 }}
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={(post) => <PostCard post={post.item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 128,
    backgroundColor: "#fff",
  },
});
