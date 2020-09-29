import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Clipboard } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

import store, { persistor } from "./redux/store";
import Gate from "./components/Gate";

const bmhannaFonts = {
  BMHANNA: require("./assets/fonts/BMHANNAPro.ttf"),
};

export default function App() {
  const [isLoaded] = useFonts(bmhannaFonts);

  if (!isLoaded) {
    return <AppLoading />;
  }

  // HACK: Prevent "Expo pasted from CoreSimulator" notification from spamming continuously
  if (__DEV__) {
    Clipboard.setString("");
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Gate />
      </PersistGate>
    </Provider>
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
