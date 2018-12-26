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
