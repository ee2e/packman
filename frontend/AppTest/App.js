/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class Logo extends Component {
  render () {
    let img = '';
    if (this.props.type == 'one') {
      img = require('./assets/logo.gif');
    } else if (this.props.type == 'two') {
      img = require('./assets/kakao_login.png');
    }

    return (
      <View>
        <Image source = {img} style={{width:200, height:200}}></Image>
      </View>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props); // 필수로 적어야함! 

    this.state = {
      address : 'ssafy'
    }
  }

  writeAddress = () => {
    this.setState({
      address : 'SSAFY'
    }, function() {
      alert(this.state.address);
    })
  }

  writeReset = () => {
    this.setState({
      address : 'ssafy'
    }, function() {
      alert(this.state.address);
    })
  }

  render () {
    return (
      <View>
        <View style = {styles.container}>
          <Logo type = 'one'/>
          {/* <Logo type = 'two'/> */}
        
          <View sylte = {{flexDirection: 'column'}}>
            <View style = {{flexDirection: 'row'}}>
              <Text style = {styles.title}>Hello World</Text>
              <Text style = {styles.detail}> {this.state.address} </Text>
            </View>

            <View style = {{flexDirection: 'row'}}>
              <Button title = {'print'} onPress={this.writeAddress}/>
              <Button title = {'reset'} onPress={this.writeReset}/>
            </View>
          </View>
        </View>

        <View style  >
          
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'row'
  },
  title : {
    marginLeft : 10,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15
  },
  detail : {
    marginLeft : 10
  }
});

export default App;
