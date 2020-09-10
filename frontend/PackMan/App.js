import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-elements';

import { useFonts } from '@use-expo/font';

import { AppLoading } from 'expo';

const bmhannaFonts = {
  'BMHANNA': require('./assets/fonts/BMHANNAPro.ttf'),
};

export default function App() {
  const [isLoaded] = useFonts(bmhannaFonts);

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.gif')} style={styles.logo} />
      <Text h3 style={styles.text}>PACKMAN</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    resizeMode: 'contain'
  },
  text: {
    fontWeight: 'bold',
    color: '#08b5dd',
    fontFamily: 'BMHANNA'
  }
});
