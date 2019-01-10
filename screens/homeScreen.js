import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  AsyncStorage
} from "react-native";

// Home screen that asks user to connect
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: "" };
  }

  static navigationOptions = {
    title: "Home"
  };

  componentDidMount() {
    // Verify that there is an accessToken (if user is logged in)
    AsyncStorage.getItem("accessToken").then(accessToken => {
      if (accessToken) {
        this.props.navigation.navigate("Datalist");
      }
    });

    // If you arrive on the application via a redirect link, grab the token from the link and save it in localstorage
    Linking.getInitialURL()
      .then(url => {
        this.setState({ url });
        if (url) {
          console.log("Initial url is: " + url);
          AsyncStorage.setItem("accessToken", url.split("user=")[1]);
          this.props.navigation.push("DataList");
        }
      })
      .catch(err => console.error("An error occurred", err));
  }

  render() {
    return (
      <View style={styles.container}>
        {[0, 1, 2, 3, 4].map(i => (
          <Button
            title={`Simuler le consentement du client ${i}`}
            onPress={() =>
              this.props.navigation.navigate("Connect", { testClientId: i })
            }
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
