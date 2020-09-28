import React, { Component } from "react";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import moment from 'moment';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
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

  handleDatePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format('YYYY년 M월 DD일')
    })
  }

  showDatePicker = () => {
    this.setState({
      isVisible: true
    })
  }

  hideDatePicker = () => {
    this.setState({
      isVisible: false
    })
  }

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

  writeCheckList = async (event) => {
    const { content } = this.state;

    if (!this.isFormValid()) {
      return;
    }

    try {
      if (status === 201) {
        alert("체크리스트 작성 완료");
      }
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

      <View style={styles.container}>
        <View style={styles.top}>
          <MaterialIcons
            name="close"
            size={30}
            color="black"
            style={{ marginTop: 30, marginBottom: 10, marginLeft: 13 }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.top_text}>일정</Text>
          <MaterialIcons
            name="check"
            size={30}
            color="black"
            style={{ marginTop: 30, marginBottom: 10, marginRight: 13 }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <Input
                  value={content}
                  onChangeText={(content) => this.setState({ content })}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  placeholder="일정을 입력하세요."
                  // onSubmitEditing={() => this.passwordInput.focus()}
                />
              </View>
          </TouchableWithoutFeedback>

          <View>
            <TouchableOpacity onPress={this.showDatePicker}>
              <Text>{this.state.chosenDate}</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handleDatePicker}
              onCancel={this.hideDatePicker}
            />
          </View>
        </KeyboardAvoidingView>
    </View>
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
    marginTop: 21,
    fontSize: 20
  },
  
});