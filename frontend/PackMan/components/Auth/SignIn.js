import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";

export default function SingIn({ navigation }) {
  const goToSignUp = () => navigation.navigate("SignUp");
  const goToFind = () => navigation.navigate("Find");
  const signIn = () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={require("../../assets/logo.gif")}
            style={styles.logo}
          />
          <Input
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholder="email@address.com"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            leftIcon={<MaterialIcons name="email" size={24} color="#03bcdb" />}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="비밀번호"
            ref={(input) => (this.passwordInput = input)}
            onSubmitEditing={signIn}
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
          <TouchableOpacity onPress={goToFind}>
            <Text style={styles.text}>이메일 / 비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={styles.text}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 88,
    marginBottom: 40,
  },
  text: {
    fontFamily: "BMHANNA",
    fontSize: 18,
    marginTop: 20,
  },
  inputContainer: {
    width: 300,
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
