/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapView from 'react-native-maps';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Dashboard from "./screens/Dashboard";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splashscreen from "./screens/Splash/SplashScreen";
var {width, height} = Dimensions.get('window');
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Stack = createStackNavigator();

  function InitStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name="Splashscreen" component={Splashscreen} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    )
  }
  return (
      <NavigationContainer>
        <InitStack/>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default App;
