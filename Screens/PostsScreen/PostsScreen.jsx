import { StyleSheet, SafeAreaView, FlatList, Text } from "react-native";

import React, { useState } from "react";

import { UserInfo } from "../../componets/UserInfo/UserInfo.jsx";
import { PostCard } from "../../componets/PostCard/PostCard.jsx";
import { selectPosts } from "../../Redux/postsSlice.js";
import { useSelector } from "react-redux";

export default function PostsScreen() {
  // const [posts, setPosts] = useState(testPosts);
  //
  const posts = useSelector(selectPosts);

  return (
    <SafeAreaView style={styles.container}>
      <UserInfo
      // avatar={{uri: 'https://reactjs.org/logo-og.png'}  }
      />

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
    // paddingTop:32,
    paddingBottom: 128,
    // padding:16,
    backgroundColor: "#fff",
  },
});
