import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from 'react-native-elements';

import SignIn from "./screens/Auth/SignIn";
import SignUp from "./screens/Auth/SignUp";

const bmhannaFonts = {
  BMHANNA: require("./assets/fonts/BMHANNAPro.ttf"),
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 2000);
  }, []);


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
