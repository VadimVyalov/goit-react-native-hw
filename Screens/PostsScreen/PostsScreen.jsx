import { StyleSheet, SafeAreaView, FlatList } from "react-native";

import React, { useState } from "react";

import { testPosts } from "../../posts.js";
import { UserInfo } from "../../componets/UserInfo/UserInfo.jsx";
import { PostCard } from "../../componets/PostCard/PostCard.jsx";

export default function PostsScreen() {
  const [posts, setPosts] = useState(testPosts);
  const isLoading = posts.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <UserInfo
      // avatar={{uri: 'https://reactjs.org/logo-og.png'}  }
      />
      {isLoading && (
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={(post) => <PostCard post={post.item} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    // paddingTop:32,
    paddingBottom: 112,
    // padding:16,
    backgroundColor: "#fff",
  },
});
