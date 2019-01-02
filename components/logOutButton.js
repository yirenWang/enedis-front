import React from "react";
import { Button, Alert, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";

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
            AsyncStorage.getItem("accessToken").then(accessToken => {
              // call api to delete data
              return axios.get(`${backURL}/deleteme`, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken ||
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZha2VJZCIsImlhdCI6MTUzNDY3MTgxNX0.hvlHTI1aJzYvMqVallSxndoszscVgUY-0EQEhwgYK6o"}`
                }
              });
            });
            // remove access token from async token
            AsyncStorage.removeItem("accessToken");
            this.props.navigation.navigate("Home");
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
        title="Effacer mes données et me déconnecter"
        onPress={this.showAlert}
      />
    );
  }
}

export default withNavigation(LogOutButton);
