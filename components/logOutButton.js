import React from "react";
import { Button, Alert, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import axios from "axios";
import { backURL } from "../config.js";
class LogOutButton extends React.Component {
  showAlert = () => {
    return Alert.alert(
      "Déconnexion",
      "Confirmez-vous vouloir effacer vos données de consommation et vous déconnecter ?",
      [
        {
          text: "Oui",
          onPress: () => {
            // get access token from asyncstorage and delete data.
            AsyncStorage.getItem("accessToken")
              .then(accessToken => {
                return axios.get(`${backURL}/deleteme`, {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`
                  }
                });
              })
              .then(res => {
                throw new Error(e);

                // remove access token from async token
                AsyncStorage.removeItem("accessToken");
                this.props.navigation.navigate("Home");
              })
              .catch(e => {
                throw new Error(e);
              });
          },
          style: "cancel"
        },
        { text: "Non", onPress: () => console.log("Nope") }
      ],
      { cancelable: true }
    );
  };

  render() {
    return (
      <Button
        title={`Effacer mes données et me déconnecter`}
        onPress={this.showAlert}
      />
    );
  }
}

export default withNavigation(LogOutButton);
