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

// Associate the different screens to the different routes
const RootStack = createStackNavigator(
  {
    Home: HomeScreen, // Screen to click on connect
    Connect: ConnectionScreen, // Webview to login with enedis
    Profile: ProfileScreen, // Overview of details of client (name and address)
    Data: DataScreen, // Shows the data graphs
    DataList: DataListScreen // List of possible graphs
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
