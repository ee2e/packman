import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-elements";

import { MaterialIcons } from "@expo/vector-icons";
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
      {/* <Input
        placeholder="INPUT WITH CUSTOM ICON"
        leftIcon={<Icon name="user" size={24} color="black" />}
      />
      <Input
        placeholder="Comment"
        leftIcon={{ type: "font-awesome", name: "comment" }}
        style={styles}
        onChangeText={(value) => this.setState({ comment: value })}
      />
      <Input
        placeholder="INPUT WITH ERROR MESSAGE"
        errorStyle={{ color: "red" }}
        errorMessage="ENTER A VALID ERROR HERE"
      /> */}
      <Input
        containerStyle={styles.inputContainer}
        label="비밀번호"
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={<MaterialIcons name="lock" size={24} color="#03bcdb" />}
      />
      <Text style={styles.text}>아이디 / 비밀번호 찾기</Text>
      <Text style={styles.text}>회원가입</Text>
      <Image
        source={require("../../assets/kakao_login.png")}
        style={styles.kakaoLogin}
      />
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
    fontSize: 20,
    marginTop: 20,
  },
  inputContainer: {
    width: 270,
  },
  kakaoLogin: {
    marginTop: 25,
  },
});
