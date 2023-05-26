import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import { SimpleLineIcons, Fontisto, AntDesign } from "@expo/vector-icons";

export const PostCard = ({ post }) => {
  const { image, description, comments, lacation, likes } = post;

  return (
    <View style={styles.postCard}>
      <View>
        <Image style={styles.image} source={{ uri: image }} />
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.additional}>
        <View style={styles.leftSideConteiner}>
          <TouchableOpacity style={styles.commentContainer}>
            <Fontisto
              name="comment"
              style={styles.commentIcon}
              color={!comments ? "#BDBDBD" : "#FF6C00"}
            />
            <Text style={styles.comment}>{comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.likeContainer}>
            <AntDesign
              name="like2"
              size={20}
              color={!likes ? "#BDBDBD" : "#FF6C00"}
            />
            <Text style={styles.comment}>{likes}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationContainer}>
          <SimpleLineIcons
            style={styles.locationIcon}
            name="location-pin"
            color="#BDBDBD"
          />
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
    transform: [{ rotateY: "180deg" }, { scaleX: 0.75 }],
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
  locationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    fontSize: 20,
    transform: [{ scaleX: 1.1 }],
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
