import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

export const UserInfo = ({
  name = "Test User",
  email = "user@mail.com",
  avatar = require("../../assets/images/avatar.png"),
}) => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground
          style={ styles.image}
          source={avatar}
        >
</ImageBackground> */}

      <Image style={styles.avatar} source={avatar} />

      <View style={styles.description}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>

    ///
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 32,
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: 60,
    height: 60,
  },
  avatar: {
    resizeMode: "cover",
    width: 60,
    height: 60,
    borderRadius: 16,
    // borderColor:'#000',
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
  },
  description: {
    paddingLeft: 8,
  },
  name: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 15,
    lineHeight: 18,
  },
  email: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 15,
    opacity: 0.8,
  },
});
