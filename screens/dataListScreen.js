import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import LogOutButton from "../components/logOutButton";
import ProfileButton from "../components/profileButton";

// List the different types of data that can be shown
export default class DataListScreen extends React.Component {
  static navigationOptions = {
    title: "Mes Données"
  };

  render() {
    // Different types de données réçu par le backend - Different types of data that the backend provides
    // name: title that is shown on the DataScreen - nom afficher dans le titre de DataScreen
    // slug: GET /metering/${slug}
    const dataTypes = [
      { name: "Consommation quotidienne", slug: "daily_consumption" },
      {
        name: "Consommation par demi-heure",
        slug: "consumption_load_curve"
      },
      { name: "Puissance maximale", slug: "consumption_max_power" }
      // { name: "Production journalier", slug: "daily_production" }
    ];
    const { navigation } = this.props;
    return (
      <View>
        <ProfileButton />
        <List>
          {dataTypes.map((item, i) => {
            return (
              <ListItem
                key={i}
                title={item.name}
                hideChevron={false}
                onPress={() => navigation.push("Data", item)}
              />
            );
          })}
        </List>
        <LogOutButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  item: {
    padding: 10,
    fontSize: 22,
    height: 44
  }
});
