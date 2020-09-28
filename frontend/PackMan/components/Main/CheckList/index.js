import React, { Component } from "react";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard
 } from "react-native";

export default class CheckList extends Component {

  constructor(props){
    super();
    
    this.state = {
      content: ""
    }
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
                  returnKeyType="next"
                  // onSubmitEditing={() => this.passwordInput.focus()}
                />
              </View>
          </TouchableWithoutFeedback>
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
    marginTop: 30,
    fontSize: 20
  }
});