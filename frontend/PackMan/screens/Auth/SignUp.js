import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, Button } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "react-native-elements";

export default function SingIn() {
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
      <Input
        containerStyle={styles.inputContainer}
        label="비밀번호확인"
        placeholder="Password Confirm"
        secureTextEntry={true}
        leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
      />
      <Input
        containerStyle={styles.inputContainer}
        label="이름"
        placeholder="User Name"
        leftIcon={<MaterialIcons name="person" size={24} color="#03bcdb" />}
      />
      <View style={styles.buttonsContainer}>
        <Button
          title="회원가입"
          buttonStyle={styles.signUpButton}
          containerStyle={styles.signUpButtonContainer}
          titleStyle={styles.signUpTitle}
        />
        <Button
          title="뒤로"
          buttonStyle={styles.backButton}
          containerStyle={styles.backButtonContainer}
          titleStyle={styles.backTitle}
        />
      </View>
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
  signUpButton: {
    backgroundColor: "#03bcdb",
    borderWidth: 2,
    borderColor: "#03bcdb",
    borderRadius: 6,
  },
  backButton: {
    backgroundColor: "#e0e0e0",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 6,
  },
  signUpButtonContainer: {
    marginTop: 10,
    height: 60,
    width: 100,
  },
  backButtonContainer: {
    marginTop: 10,
    marginLeft: 10,
    height: 60,
    width: 70,
  },
  signUpTitle: { fontWeight: "bold" },
  backTitle: { fontWeight: "bold", color: "#000" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 20,
    marginRight: 110,
  },
});
