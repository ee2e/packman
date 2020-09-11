import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

import SignIn from "./screens/Auth/SignIn";
import SignUp from "./screens/Auth/SignUp";

const bmhannaFonts = {
  BMHANNA: require("./assets/fonts/BMHANNAPro.ttf"),
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoaded] = useFonts(bmhannaFonts);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);

  if (!isLoaded) {
    return <AppLoading />;
  }

  return isReady ? (
    <View style={styles.container}>
      <SignUp />
    </View>
  ) : (
    <View style={styles.container}>
      <Image source={require("./assets/logo.gif")} style={styles.logo} />
      <Text h3 style={styles.text}>
        PACK-MAN
      </Text>
      <StatusBar style="auto" />
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
    width: 200,
    resizeMode: "contain",
  },
  text: {
    fontWeight: "bold",
    color: "#14c6e4",
    fontFamily: "BMHANNA",
  },
});
