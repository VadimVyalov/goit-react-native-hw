import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export const PostCard = ({ post }) => {
  const { image, description, comments, lacation, likes } = post;
  const navigation = useNavigation();
  return (
    <View style={styles.postCard}>
      <View>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.additional}>
        <View style={styles.leftSideConteiner}>
          <TouchableOpacity
            style={styles.commentContainer}
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <Feather
              name="message-circle"
              style={styles.commentIcon}
              color={!comments ? "#BDBDBD" : "#FF6C00"}
            />
            <Text style={styles.comment}>{comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeContainer}>
            <Feather
              style={styles.likeIcon}
              name="thumbs-up"
              color={!likes ? "#BDBDBD" : "#FF6C00"}
            />
            <Text style={styles.comment}>{likes}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => navigation.navigate("MapScreen")}
        >
          <Feather style={styles.locationIcon} name="map-pin" color="#BDBDBD" />
          <Text style={styles.location}>{lacation}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    // paddingTop:32,
    paddingBottom: 112,
    // padding:16,
    backgroundColor: "#fff",
  },
  postCard: {
    backgroundColor: "#fff",
  },

  image: {
    resizeMode: "cover",
    height: 240,
    borderRadius: 8,
  },
  description: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingVertical: 8,
  },
  additional: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  leftSideConteiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
  },

  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  commentIcon: {
    fontSize: 20,
    transform: [{ rotateY: "180deg" }],
  },
  comment: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  likeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  likeIcon: {
    fontSize: 20,
  },
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 20,
  },
  location: {
    marginLeft: 5,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
