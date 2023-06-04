import { StyleSheet, Text, View, Image } from "react-native";
import dateFormat from "dateformat";

export const CommentBox = ({ comment }) => {
  const { avatar, text, owner = false, date } = comment;

  return (
    <View
      style={{
        ...styles.container,
        flexDirection: owner ? "row-reverse" : "row",
      }}
    >
      <Image style={styles.avatar} source={{ uri: avatar }} />
      <View
        style={{
          ...styles.comment,
          borderTopLeftRadius: owner * 8,
          borderTopRightRadius: !owner * 8,
        }}
      >
        <Text style={styles.text}>{text}</Text>
        <Text style={{ ...styles.date, textAlign: owner ? "left" : "right" }}>
          {dateFormat(new Date(Number(date)), "dd mmmm , yyyy | HH:MM")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginVertical: 12,
    // borderColor: "#F00",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  comment: {
    flexShrink: 1,
    flexGrow: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#0000000A",
    // borderColor: "#00F",
    // borderStyle: "solid",
    // borderWidth: 1,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
    color: "#212121",
  },

  date: {
    color: "#A0A0A0",
    fontSize: 10,
    lineHeight: 12,
  },
});
