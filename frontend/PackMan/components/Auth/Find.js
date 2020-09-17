import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

TabSelector.propTypes = {
  selected: PropTypes.bool.isRequired,
};

export default class LoginScreen2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 0,
      isLoading: false,
    };

    this.selectCategory = this.selectCategory.bind(this);
  }

  selectCategory(selectedCategory) {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  render() {
    const { selectedCategory, isLoading } = this.state;
    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/logo.gif")} style={styles.logo} />
        <View>
          <KeyboardAvoidingView
            contentContainerStyle={styles.loginContainer}
            behavior="position"
          >
            <View style={{ flexDirection: "row" }}>
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(0)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isLoginPage && styles.selectedCategoryText,
                ]}
                title={"이메일 찾기"}
              />
              <Button
                disabled={isLoading}
                type="clear"
                activeOpacity={0.7}
                onPress={() => this.selectCategory(1)}
                containerStyle={{ flex: 1 }}
                titleStyle={[
                  styles.categoryText,
                  isSignUpPage && styles.selectedCategoryText,
                ]}
                title={"비밀번호 찾기"}
              />
            </View>
            <View style={styles.rowSelector}>
              <TabSelector selected={isLoginPage} />
              <TabSelector selected={isSignUpPage} />
            </View>
            <View style={styles.formContainer}>
              {isSignUpPage && (
                <Input
                  label="이메일"
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  placeholder="email@address.com"
                  leftIcon={
                    <MaterialIcons name="email" size={24} color="#03bcdb" />
                  }
                />
              )}
              <Input
                containerStyle={styles.inputContainer}
                label="이름"
                placeholder="홍길동"
                leftIcon={
                  <MaterialIcons name="person" size={24} color="#03bcdb" />
                }
              />
              <Input
                containerStyle={styles.inputContainer}
                label="폰 번호"
                placeholder="0101234567"
                leftIcon={
                  <MaterialIcons name="smartphone" size={24} color="#03bcdb" />
                }
              />
              <View style={styles.buttonsContainer}>
                <Button
                  title="확인"
                  buttonStyle={styles.findButton}
                  containerStyle={styles.findButtonContainer}
                  titleStyle={styles.findTitle}
                  loading={isLoading}
                  disabled={isLoading}
                />
                <Button
                  title="뒤로"
                  buttonStyle={styles.backButton}
                  containerStyle={styles.backButtonContainer}
                  titleStyle={styles.backTitle}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 88,
    marginBottom: 40,
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center",
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white",
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  categoryText: {
    textAlign: "center",
    color: "#03bcdb",
    fontSize: 24,
    fontFamily: "BMHANNA",
    backgroundColor: "transparent",
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  inputContainer: {
    width: 350,
  },
  findButton: {
    backgroundColor: "#03bcdb",
    borderWidth: 2,
    borderColor: "#03bcdb",
    borderRadius: 6,
  },
  backButton: {
    backgroundColor: "#e0e0e0",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 6,
  },
  findButtonContainer: {
    marginTop: 10,
    height: 60,
    width: 80,
  },
  backButtonContainer: {
    marginTop: 10,
    marginLeft: 10,
    height: 60,
    width: 80,
  },
  findTitle: { fontWeight: "bold" },
  backTitle: { fontWeight: "bold", color: "#000" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 30,
    marginRight: 50,
  },
});
