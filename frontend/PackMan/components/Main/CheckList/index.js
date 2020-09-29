import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
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

export default class CheckList extends Component {

  constructor(props){
    super();
    
    this.state = {
      content: '',
      chosenDate: '날짜를 선택해주세요!',
      isVisible: false
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
      content
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

            <TextInput
              style={styles.input}
              value={content}
              onChangeText={(content) => this.setState({ content })}
              placeholder="일정을 입력하세요."
              multiline={true}
              onEndmitEditing={Keyboard.dismiss}
            />
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
  input: {
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
    marginRight: 50
  },
  date_text: {
    fontFamily: "BMHANNA",
    fontSize: 20,
  }
  
});