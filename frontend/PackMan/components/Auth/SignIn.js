import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

import { useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { userLogin, userKakaoLogin } from "../../redux/usersSlice";
import utils from "../../utils";

export default function SingIn({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const goToFind = () => {
    navigation.navigate("Find");
  };

  const isFormValid = () => {
    if (email === "" || password === "") {
      alert("모든 필드를 채워주세요.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("올바른 이메일이 아닙니다.");
      return false;
    }
    return true;
  };

  const doSignIn = () => {
    dispatch(
      userLogin({
        username: email,
        password,
      })
    );
  };

  const doKakaoLogin = () => {
    dispatch(userKakaoLogin());
  };

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Image
            source={require("../../assets/logo.gif")}
            style={styles.logo}
          />
          <Input
            value={email}
            onChangeText={(email) => setEmail(email)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholder="email@address.com"
            keyboardType="email-address"
            leftIcon={<MaterialIcons name="email" size={24} color="#03bcdb" />}
          />
          <Input
            value={password}
            onChangeText={(password) => setPassword(password)}
            containerStyle={styles.inputContainer}
            placeholder="비밀번호"
            secureTextEntry={true}
            leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
          />
          <Button
            title="로그인"
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.title}
            onPress={doSignIn}
          />
          <TouchableOpacity onPress={doKakaoLogin}>
            <Image source={require("../../assets/kakao_login.png")} />
          </TouchableOpacity>
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
