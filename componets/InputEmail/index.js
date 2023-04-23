import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

const InputEmail = ({ onChangeText, value, placeholder, onFocus }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [focus, setFocus] = useState(false);

  const borderColor = focus ? "#FF6C00" : "#E8E8E8";
  const backgroundColor = focus ? "#FFF" : "#F6F6F6";

  // const lastNameRef = useRef();
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.input,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
        }}
        placeholder={placeholder}
        placeholderTextColor="#BDBDBD"
        onFocus={() => {
          onFocus ? onFocus() : null;
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
          //   setIsSecureEntry(true);
        }}
        value={value}
        onChangeText={onChangeText}
        // ref={lastNameRef}
      />
    </View>
  );
};
export default InputEmail;
