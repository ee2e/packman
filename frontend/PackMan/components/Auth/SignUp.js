import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Input } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";

import utils from "../../utils";
import api from "../../api";

export default class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      username: "",
      phoneNumber: "",
    };
  }

  isFormValid = () => {
    const {
      email,
      password,
      passwordConfirm,
      username,
      phoneNumber,
    } = this.state;
    if (
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      username === "" ||
      phoneNumber === ""
    ) {
      alert("모든 필드를 채워주세요.");
      return false;
    }
    if (!utils.isEmail(email)) {
      alert("올바른 이메일을 작성해주세요.");
      return false;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    return true;
  };

  doSignUp = async (event) => {
    const { email, password, username, phoneNumber } = this.state;

    if (!this.isFormValid()) {
      return;
    }

    try {
      const { status } = await api.createAccount({
        username: email,
        email,
        password,
        nickname: username,
        phone_number: phoneNumber,
      });
      if (status === 201) {
        alert("회원가입완료");
      }
    } catch (event) {
      alert("이미 존재하는 이메일입니다.");
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      email,
      password,
      passwordConfirm,
      username,
      phoneNumber,
    } = this.state;
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
              value={email}
              onChangeText={(email) => this.setState({ email })}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholder="email@address.com"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              leftIcon={
                <MaterialIcons name="email" size={24} color="#03bcdb" />
              }
            />
            <Input
              value={password}
              onChangeText={(password) => this.setState({ password })}
              containerStyle={styles.inputContainer}
              placeholder="비밀번호"
              secureTextEntry={true}
              returnKeyType="next"
              ref={(input) => (this.passwordInput = input)}
              onSubmitEditing={() => this.passwordConfirmInput.focus()}
              leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
            />
            <Input
              value={passwordConfirm}
              onChangeText={(passwordConfirm) =>
                this.setState({ passwordConfirm })
              }
              containerStyle={styles.inputContainer}
              placeholder="비밀번호 확인"
              secureTextEntry={true}
              returnKeyType="next"
              ref={(input) => (this.passwordConfirmInput = input)}
              onSubmitEditing={() => this.userNameInput.focus()}
              leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
            />
            <Input
              value={username}
              onChangeText={(username) => this.setState({ username })}
              containerStyle={styles.inputContainer}
              placeholder="홍길동"
              returnKeyType="next"
              ref={(input) => (this.userNameInput = input)}
              onSubmitEditing={() => this.phoneNumberInput.focus()}
              leftIcon={
                <MaterialIcons name="person" size={24} color="#03bcdb" />
              }
            />
            <Input
              value={phoneNumber}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              containerStyle={styles.inputContainer}
              placeholder="0101234567"
              keyboardType="number-pad"
              ref={(input) => (this.phoneNumberInput = input)}
              onSubmitEditing={this.doSignup}
              leftIcon={
                <MaterialIcons name="smartphone" size={24} color="#03bcdb" />
              }
            />
            <View style={styles.buttonsContainer}>
              <Button
                title="회원가입"
                buttonStyle={styles.signUpButton}
                containerStyle={styles.signUpButtonContainer}
                titleStyle={styles.signUpTitle}
                onPress={this.doSignUp}
              />
              <Button
                title="뒤로"
                buttonStyle={styles.backButton}
                containerStyle={styles.backButtonContainer}
                titleStyle={styles.backTitle}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
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
    // 36.5%
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
