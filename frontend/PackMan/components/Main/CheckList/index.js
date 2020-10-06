import React, { useState } from "react";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { ListItem, Input } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { createCheckList, checkListShow } from "../../../redux/checksSlice";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default function CheckList({ navigation }) {
  console.log("------------------------------------------------------------");
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [chosenDate, setChosenDate] = useState("날짜를 선택해주세요!");
  const [sendDate, setSendDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [stuffs, setStuffs] = useState([
    { name: "폼클렌징" },
    { name: "머리끈" },
  ]);
  const [supply, setSupply] = useState("");
  const [update, setUpdate] = useState(false);
  const GOOGLE_PLACES_API_KEY = api.GOOGLE_PLACES_API_KEY;

  const dispatch = useDispatch();

  // 컴포넌트 이동 시 일정, 날짜 초기화
  const resetDate = () => {
    setContent("");
    setChosenDate("날짜를 선택해주세요!");
    setSendDate("");
    setPlace("");
  };

  // 날짜 선택
  const handleDatePicker = (datetime) => {
    setIsVisible(false);
    setChosenDate(moment(datetime).format("YYYY년 MM월 DD일"));
    setSendDate(moment(datetime).format("YYYYMMDD"));
  };

  // 날짜 선택창 보여주기
  const showDatePicker = () => {
    setIsVisible(true);
  };

  // 날짜 선택창 숨기기
  const hideDatePicker = () => {
    setIsVisible(false);
  };

  // 일정 입력 여부 확인
  const isFormValid = () => {
    if (content === "") {
      alert("일정을 입력해주세요.");
      return false;
    }
    return true;
  };

  // 체크리스트 작성
  const writeCheckList = (event) => {
    if (!isFormValid()) {
      return;
    }

    try {
      dispatch(
        createCheckList({
          content,
          stuffs,
          date: sendDate,
          place,
        })
      );
      resetDate();
      setTimeout(() => {
        dispatch(checkListShow());
        navigation.navigate("calendar", true);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // 준비물 삭제
  const supplyRemove = (name) => {
    setStuffs(stuffs.filter((supply) => supply.name !== name));
  };

  // 준비물 검색
  const searchSupply = (value) => {
    setSupply(value);
    // const { data } = api.searchSupply({ data: value });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
            <Text style={styles.top_text}>일정</Text>
            <MaterialIcons
              name="check"
              size={30}
              color="black"
              style={{ marginTop: 30, marginBottom: 10, marginRight: 13 }}
              onPress={writeCheckList}
            />
          </View>

          {/* 일정 입력 */}
          <TextInput
            style={styles.input_content}
            value={content}
            onChangeText={(content) => setContent(content)}
            placeholder="일정을 입력하세요."
            multiline={true}
            onEndmitEditing={Keyboard.dismiss}
          />

          {/* 날짜 선택 */}
          <TouchableOpacity style={styles.date_button} onPress={showDatePicker}>
            <Text style={styles.date_text}> {chosenDate} </Text>
          </TouchableOpacity>
          <DateTimePicker
            isVisible={isVisible}
            onConfirm={handleDatePicker}
            onCancel={hideDatePicker}
            cancelTextIOS="취소"
            confirmTextIOS="확인"
            headerTextIOS="여행 날짜"
            locale="ko-KR"
          />

          {/* 장소 선택 */}
          <View style={styles.view_place}>
            <EvilIcons
              style={styles.icon_place}
              name="location"
              size={40}
              color="#03bcdb"
            />
            <GooglePlacesAutocomplete
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: "ko",
              }}
              onPress={(data, details = null) => setPlace(data.description)}
              onFail={(error) => console.error(error)}
              requestUrl={{
                url:
                  "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
                useOnPlatform: "web",
              }}
              placeholder="장소"
              styles={{
                container: {
                  marginTop: 15,
                  marginRight: 20,
                },
                textInputContainer: {
                  backgroundColor: "#f2f2f2",
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                },
                textInput: {
                  marginLeft: 14,
                  marginRight: 0,
                  backgroundColor: "#f2f2f2",
                  fontFamily: "BMHANNA",
                  fontSize: 18,
                },
              }}
            />
          </View>

          {/* 준비물 입력 */}
          <View style={styles.view_place}>
            <EvilIcons
              style={styles.icon_place}
              name="archive"
              size={40}
              color="#03bcdb"
            />
            <View
              style={{
                borderBottomColor: "#BDBDBD",
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />

            <View style={styles.container_list}>
              {stuffs.map((supply, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  containerStyle={{
                    width: 280,
                    height: 47,
                    backgroundColor: "#f2f2f2",
                    fontFamily: "BMHANNA",
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.input_list}>
                      {supply.name}
                    </ListItem.Title>
                  </ListItem.Content>
                  <TouchableOpacity onPress={() => supplyRemove(supply.name)}>
                    <ListItem.Chevron name="close" type="evilicon" />
                  </TouchableOpacity>
                </ListItem>
              ))}
              <Input
                containerStyle={{
                  width: 280,
                  height: 47,
                  backgroundColor: "#f2f2f2",
                  marginLeft: 0,
                }}
                style={styles.input_stuff}
                placeholder="준비물을 입력하세요."
                value={supply}
                onChangeText={(value) => setSupply(value)}
                rightIcon={
                  <Octicons
                    name="plus"
                    size={24}
                    color="black"
                    onPress={() =>
                      setStuffs(
                        stuffs.concat({
                          name: supply,
                        })
                      )
                    }
                  />
                }
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  input_content: {
    fontFamily: "BMHANNA",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    height: 50,
    fontSize: 20,
  },
  date_button: {
    height: 50,
    backgroundColor: "#ffe14b",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  date_text: {
    fontFamily: "BMHANNA",
    fontSize: 20,
  },
  view_place: {
    flexDirection: "row",
  },
  icon_place: {
    marginLeft: 20,
    marginTop: 20,
  },
  container_list: {
    marginTop: 13,
    marginLeft: 10,
    marginRight: 50,
    backgroundColor: "#f2f2f2",
  },
  input_list: {
    fontFamily: "BMHANNA",
    fontSize: 18,
  },
  input_stuff: {
    fontFamily: "BMHANNA",
    marginLeft: 5,
  },
});
