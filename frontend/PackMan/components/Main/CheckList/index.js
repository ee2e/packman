import React, { Component } from "react";
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
} from "react-native";
import { ListItem, Input } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import key from '../../../api';

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export default class CheckList extends Component {
  constructor(props) {
    super();

    this.state = {
      content: "",
      place: "",
      chosenDate: "날짜를 선택해주세요!",
      isVisible: false,
      location: null,
      GOOGLE_PLACES_API_KEY: key.GOOGLE_PLACES_API_KEY,
      supplies: [
        { id: 1, name: "폼클렌징" },
        { id: 2, name: "머리끈" },
      ],
      supply: "",
    };
  }

  // 컴포넌트 이동 시 일정, 날짜 초기화
  reset = () => {
    this.setState({
      content: "",
      chosenDate: "날짜를 선택해주세요!",
    });
  };

  // 날짜 선택
  handleDatePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format("YYYY년 M월 DD일"),
    });
  };

  // 날짜 선택창 보여주기
  showDatePicker = () => {
    this.setState({
      isVisible: true,
    });
  };

  // 날짜 선택창 숨기기
  hideDatePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  // 장소 선택

  // 일정 입력 여부 확인
  isFormValid = () => {
    const { content } = this.state;
    if (content === "") {
      alert("일정을 입력해주세요.");
      return false;
    }
    return true;
  };

  // 체크리스트 작성
  writeCheckList = async (event) => {
    const { content } = this.state;

    if (!this.isFormValid()) {
      return;
    }

    try {
      this.resetDate();
      alert("체크리스트 작성 완료");
    } catch (event) {
      alert("체크리스트 작성 실패");
    }
  };

  // 준비물 삭제
  supplyRemove = (id) => {
    const { supplies } = this.state;
    this.setState({
      supplies: supplies.filter((supply) => supply.id !== id),
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      content,
      place,
      GOOGLE_PLACES_API_KEY,
      supplies,
      supply,
    } = this.state;

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
                  this.reset();
                  navigation.goBack();
                }}
              />
              <Text style={styles.top_text}>일정</Text>
              <MaterialIcons
                name="check"
                size={30}
                color="black"
                style={{ marginTop: 30, marginBottom: 10, marginRight: 13 }}
                onPress={this.writeCheckList}
              />
            </View>

            {/* 일정 입력 */}
            <TextInput
              style={styles.input_content}
              value={content}
              onChangeText={(content) => this.setState({ content })}
              placeholder="일정을 입력하세요."
              multiline={true}
              onEndmitEditing={Keyboard.dismiss}
            />

            {/* 날짜 선택 */}
            <TouchableOpacity
              style={styles.date_button}
              onPress={this.showDatePicker}
            >
              <Text style={styles.date_text}> {this.state.chosenDate} </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handleDatePicker}
              onCancel={this.hideDatePicker}
              cancelTextIOS="취소"
              confirmTextIOS="확인"
              headerTextIOS="여행 날짜"
              locale="ko-KR"
            />

            {/* 장소 선택 */}
            <View style={styles.view_place}>
              <EvilIcons style={styles.icon_place} name="location" size={40} color="#03bcdb" />
              <GooglePlacesAutocomplete
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'ko',
                }}
                onPress={(data, details = null) => this.setState({ place })}
                onFail={(error) => console.error(error)}
                requestUrl={{
                  url:
                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                  useOnPlatform: 'web',
                }}
                placeholder= '장소'
                styles={{
                  container: {
                    marginTop: 15,
                    marginRight: 20
                  },
                  textInputContainer: {
                    backgroundColor: '#f2f2f2',
                    borderBottomWidth: 0,
                    borderTopWidth: 0
                  },
                  textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    backgroundColor: '#f2f2f2',
                    fontFamily: 'BMHANNA',
                    fontSize: 18
                  }
                }}
              />
            </View>

            {/* 준비물 입력 */}
            <View
              style={{
                borderBottomColor: "#BDBDBD",
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
            <View>
              {supplies.map((supply) => (
                <ListItem key={supply.id} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{supply.name}</ListItem.Title>
                  </ListItem.Content>
                  <TouchableOpacity
                    onPress={() => this.supplyRemove(supply.id)}
                  >
                    <ListItem.Chevron name="close" type="evilicon" />
                  </TouchableOpacity>
                </ListItem>
              ))}
              <Input
                containerStyle={{
                  backgroundColor: "white",
                  width: screenWidth,
                  height: 47,
                }}
                placeholder="준비물을 입력하세요."
                value={supply}
                onChangeText={(value) => this.setState({ supply: value })}
                rightIcon={
                  <Octicons
                    name="plus"
                    size={24}
                    color="black"
                    onPress={() =>
                      this.setState({
                        supplies: supplies.concat({
                          name: supply,
                        }),
                        supply: "",
                      })
                    }
                  />
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
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
});
