import React from "react";
import { Button, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";

class ProfileButton extends React.Component {
  render() {
    return (
      <Button
        title="Mon profile"
        onPress={() => this.props.navigation.push("Profile")}
      />
    );
  }
}

export default withNavigation(ProfileButton);
