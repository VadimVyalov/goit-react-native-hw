import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    // paddingTop: 10,
  },

  input: {
    textAlign: "left",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    height: 48,
    width: "100%",
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },

  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  btn: {
    position: "absolute",
    right: 16,
  },
  btnTitle: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});
