import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import { userLogout } from "../../../redux/usersSlice";

export default function Settings() {
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.inner}>
      <Button
        title="로그아웃"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.title}
        onPress={doLogout}
      />
    </View>
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
