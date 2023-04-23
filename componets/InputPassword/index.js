import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

const InputPassword = ({ onChangeText, value, onFocus }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [focus, setFocus] = useState(false);

  const focused = focus ? "#FF6C00" : "#E8E8E8";
  // const lastNameRef = useRef();
  return (
    <View style={styles.container}>
      <TextInput
        style={{ ...styles.input, borderColor: focused }}
        placeholder={"Пароль"}
        placeholderTextColor="#BDBDBD"
        secureTextEntry={isSecureEntry}
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

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          setIsSecureEntry((prev) => !prev);
          // lastNameRef.current?.focus();
        }}
      >
        <Text style={styles.btnTitle}>
          {isSecureEntry ? "Показати" : "Приховати"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default InputPassword;
