import { StatusBar } from "expo-status-bar";
import React from "react";
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

export default function SingIn({ navigation }) {
  const signUp = () => {};

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
            secureTextEntry={true}
            returnKeyType="next"
            ref={(input) => (this.passwordInput = input)}
            onSubmitEditing={() => this.passwordConfirmInput.focus()}
            leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            returnKeyType="next"
            ref={(input) => (this.passwordConfirmInput = input)}
            onSubmitEditing={() => this.userNameInput.focus()}
            leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="홍길동"
            returnKeyType="next"
            ref={(input) => (this.userNameInput = input)}
            onSubmitEditing={() => this.phoneNumberInput.focus()}
            leftIcon={<MaterialIcons name="person" size={24} color="#03bcdb" />}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder="0101234567"
            keyboardType="number-pad"
            ref={(input) => (this.phoneNumberInput = input)}
            onSubmitEditing={signUp}
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
