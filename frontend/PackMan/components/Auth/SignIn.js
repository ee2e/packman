import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text, Button } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";
import { Input } from "react-native-elements";

export default function SingIn({ navigation }) {
  const goToSignUp = () => navigation.navigate("SignUp");
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.gif")} style={styles.logo} />
      <Input
        label="이메일"
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder="email@address.com"
        leftIcon={<MaterialIcons name="email" size={24} color="#03bcdb" />}
      />
      <Input
        containerStyle={styles.inputContainer}
        label="비밀번호"
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
      />
      <Button
        title="로그인"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.title}
      />
      <Image source={require("../../assets/kakao_login.png")} />
      <Text style={styles.text}>아이디 / 비밀번호 찾기</Text>
      <TouchableOpacity onPress={goToSignUp}>
        <Text style={styles.text}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 88,
    marginBottom: 20,
  },
  text: {
    fontFamily: "BMHANNA",
    fontSize: 18,
    marginTop: 20,
  },
  inputContainer: {
    width: 270,
  },
  button: {
    backgroundColor: "#03bcdb",
    borderWidth: 2,
    borderColor: "#03bcdb",
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 10,
    height: 60,
    width: 183,
  },
  title: { fontWeight: "bold" },
});
