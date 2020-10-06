import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import { Icon, Text, CheckBox } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

export default function CheckStuff({ navigation, route }) {
  const stuffs = ["양말", "지갑"];
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <MaterialIcons
          name="close"
          size={30}
          color="black"
          style={{ marginTop: 30, marginBottom: 10, marginLeft: 13 }}
          onPress={() => {
            reset();
            navigation.goBack();
          }}
        />
        <Text style={styles.top_text}>준비물 확인</Text>
        <MaterialIcons
          name="check"
          size={30}
          color="black"
          style={{ marginTop: 30, marginBottom: 10, marginRight: 13 }}
          //   onPress={writeCheckList}
        />
      </View>
      <Image
        style={styles.tinyLogo}
        source={{
          uri:
            "/Users/eun/Desktop/특화프로젝트/s03p23d208/backend/static/202010712356.jpeg",
        }}
      />
      {stuffs.map((stuff, id) => (
        <View key={id}>
          <CheckBox title={stuff} checked="False" />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  top_text: {
    fontFamily: "BMHANNA",
    marginTop: 35,
    fontSize: 20,
  },
  tinyLogo: {
    height: 250,
    resizeMode: "contain",
    marginBottom: 10,
  },
});
