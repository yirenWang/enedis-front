import React from "react";
import { View, Text, StyleSheet, WebView } from "react-native";
import { backURL } from "../config";

// Calls login page of the back end
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Connexion avec Enedis"
  };

  render() {
    return (
      <WebView
        source={{
          uri: `https://enedis-example-app-back.herokuapp.com/login?testClientId=${this.props.navigation.getParam(
            "testClientId",
            0
          )}`
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
