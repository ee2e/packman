import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { sendCheckStuff } from "../../../redux/checksSlice";

export default function CheckStuff({ navigation, route }) {
  const dispatch = useDispatch();

  const [stuffs, setStuffs] = useState([]);

  useEffect(() => {
    var temp_stuffs = [];
    for (const stuff of route.params.stuffs) {
      console.log(stuff);
      temp_stuffs = temp_stuffs.concat({ name: stuff, check: true });
    }
    setStuffs(temp_stuffs);
  }, []);

  const checkStuff = () => {
    dispatch(
      sendCheckStuff({ suppliesId: route.params.suppliesId, stuffs: stuffs })
    );
    navigation.navigate("calendars");
  };

  const clickCheckBox = (name) => {
    const newStuff = [];
    for (const stuff of stuffs) {
      if (stuff.name === name) {
        newStuff.push({ name: stuff.name, check: !stuff.check });
      } else {
        newStuff.push(stuff);
      }
      setStuffs(newStuff);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <MaterialIcons
          name="close"
          size={30}
          color="black"
          style={{ marginTop: 30, marginBottom: 10, marginLeft: 13 }}
          onPress={() => {
            setStuffs([]);
            navigation.goBack();
          }}
        />
        <Text style={styles.top_text}>준비물 확인</Text>
        <MaterialIcons
          name="check"
          size={30}
          color="black"
          style={{ marginTop: 30, marginBottom: 10, marginRight: 13 }}
          onPress={checkStuff}
        />
      </View>
      <Image
        style={styles.aiImage}
        source={require("../../../assets/202010804522.png")}
      />
      {stuffs.map((stuff, id) => (
        <View key={id}>
          <CheckBox
            title={stuff.name}
            checked={stuff.check}
            onPress={() => clickCheckBox(stuff.name)}
          />
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
  aiImage: {
    marginLeft: 100,
    width: 170,
    height: 300,
    marginBottom: 10,
  },
});
