import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CommentBox } from "../../componets/CommentBox/CommentBox";
import {
  addComment,
  selectPosts,
  selectComments,
} from "../../Redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import * as Crypto from "expo-crypto";
const CommentsScreen = () => {
  const {
    params: { id },
  } = useRoute();
  const [text, setText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const photo = posts.find((post) => post.id === id).photo;
  const allComments = useSelector(selectComments);
  const comments =
    allComments?.filter((comment) => comment.postid === id) || [];
  const flatlistRef = useRef(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const addNewComment = () => {
    const date = dateFormat(new Date(), "dd mmmm , yyyy | HH:MM");
    const avatar =
      comments.length % 3
        ? require("../../assets/images/avatar.png")
        : require("../../assets/images/avatar_guest.png");
    const newComment = {
      postid: id,
      id: Crypto.randomUUID(),
      text,
      date,
      owner: comments.length % 3,
      avatar: avatar,
    };
    dispatch(addComment(newComment));
    Keyboard.dismiss();

    comments.length > 1 &&
      flatlistRef?.current?.scrollToEnd({ animated: true });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : ""}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          {photo && <Image style={styles.photo} source={{ uri: photo }} />}

          <View
            style={{
              marginBottom: keyboardHeight,
              height: height - keyboardHeight - 380,
              justifyContent: "flex-end",
            }}
          >
            <SafeAreaView>
              <FlatList
                ref={flatlistRef}
                style={{
                  marginBottom: 32,
                  marginTop: 60,
                }}
                data={comments}
                keyExtractor={(comment) => comment.id}
                renderItem={(comment) => <CommentBox comment={comment.item} />}
              />
            </SafeAreaView>

            <View>
              <TextInput
                value={text}
                onChangeText={(value) => setText(value)}
                multiline
                //  numberOfLines={4}
                placeholder="Коментувати..."
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={() => addNewComment()}
                activeOpacity={0.8}
                style={styles.commentCreateBtn}
              >
                <Feather name="arrow-up" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 32,
  },

  photo: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    padding: 5,
  },

  textInput: {
    fontSize: 16,
    lineHeight: 19,
    paddingLeft: 16,
    paddingRight: 52,
    paddingVertical: 10,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 24,
    backgroundColor: "#F6F6F6",
  },
  commentCreateBtn: {
    position: "absolute",
    bottom: "50%",
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 34,

    transform: [{ translateY: 17 }],
  },
});
export default CommentsScreen;
