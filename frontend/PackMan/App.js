import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";

import { Text } from "react-native-elements";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

import Gate from "./components/Gate";

const bmhannaFonts = {
  BMHANNA: require("./assets/fonts/BMHANNAPro.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(bmhannaFonts);

  if (!isLoaded) {
    return <AppLoading />;
  }

  return <Gate />;
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
