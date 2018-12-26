import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from "react-native";
import { createStackNavigator } from "react-navigation";

import HomeScreen from "./screens/homeScreen";
import ConnectionScreen from "./screens/connectScreen";
import ProfileScreen from "./screens/profileScreen";
import DataScreen from "./screens/dataScreen";
import DataListScreen from "./screens/dataListScreen";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen, // Screen to click on connect
    Connect: ConnectionScreen, // Webview to login with enedis
    Profile: ProfileScreen, // Overview of details of client (name and address)
    Data: DataScreen, //
    DataList: DataListScreen //
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

{
  /* <View style={styles.container}>
<Text style={styles.welcome}>Welcome to React Native!</Text>
<Text style={styles.instructions}>To get started, edit App.js</Text>
<Text style={styles.instructions}>{instructions}</Text>
<ConnectComponent />
</View> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
