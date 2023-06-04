import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useEffect } from "react";
import { UserInfo } from "../../componets/UserInfo/UserInfo.jsx";
import { PostCard } from "../../componets/PostCard/PostCard.jsx";
import { selectPosts } from "../../Redux/post/postsReucer.js";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../Redux/auth/authReducer.js";
import { getDataFromFirestore } from "../../Redux/post/postOperation.js";

export default function PostsScreen() {
  const posts = useSelector(selectPosts);
  const { login, email, avatar } = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataFromFirestore());
  }, []);

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
