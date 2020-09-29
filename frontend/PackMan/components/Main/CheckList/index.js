import React, { Component } from "react";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import moment from 'moment';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TextInput
 } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "react-native-modal-datetime-picker";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class CheckList extends Component {

  constructor(props){
    super();
    
    this.state = {
      content: '',
      place: '',
      chosenDate: '날짜를 선택해주세요!',
      isVisible: false,
      location: null
    }
  }

  // 컴포넌트 이동 시 일정, 날짜 초기화
  reset = () => {
    this.setState({
      content: '',
      chosenDate: '날짜를 선택해주세요!'
    })
  }

  // 날짜 선택
  handleDatePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format('YYYY년 M월 DD일')
    })
  }

  // 날짜 선택창 보여주기
  showDatePicker = () => {
    this.setState({
      isVisible: true
    })
  }

  // 날짜 선택창 숨기기
  hideDatePicker = () => {
    this.setState({
      isVisible: false
    })
  }

  // 장소 선택

  // 일정 입력 여부 확인
  isFormValid = () => {
    const {
      content
    } = this.state;
    if (
      content === "" 
    ) {
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

  render(){
    const { navigation } = this.props;
    const {
      content,
      place
    } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.top}>
              <MaterialIcons
                name="close"
                size={30}
                color="black"
                style={{ marginTop: 30, marginBottom: 10, marginLeft: 13 }}
                onPress={() => {
                  this.reset()
                  navigation.goBack()
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
              <Text
                style={styles.date_text}
              > {this.state.chosenDate} </Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handleDatePicker}
              onCancel={this.hideDatePicker}
            />

            {/* 장소 선택 */}
            <View style={styles.view_place}>
              <EvilIcons style={styles.icon_place} name="location" size={40} color="#03bcdb" />
              <TextInput
                style={styles.input_place}
                value={place}
                onChangeText={(place) => this.setState({ place })}
                placeholder="장소"
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
    flex: 1
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  top_text: {
    fontFamily: "BMHANNA",
    marginTop: 35,
    fontSize: 20
  },
  input_content: {
    fontFamily: "BMHANNA",
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    height: 70,
    fontSize: 20
  },
  date_button: {
    height: 50,
    backgroundColor: '#ffe14b',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20
  },
  date_text: {
    fontFamily: "BMHANNA",
    fontSize: 20,
  },
  view_place: {
    flexDirection: 'row',
  },
  input_place: {
    fontFamily: "BMHANNA",
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 10,
    marginRight: 20,
    height: 70,
    fontSize: 20
  },
  icon_place: {
    marginLeft: 20,
    marginTop: 20
  }
  
});