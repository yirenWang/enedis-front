import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  AsyncStorage
} from "react-native";
import { List, ListItem } from "react-native-elements";

import { backURL } from "../config";
import axios from "axios";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { personalData: [], res: {}, e: {}, contractData: [] };
  }

  static navigationOptions = {
    title: "Mon profile"
  };

  componentDidMount() {
    AsyncStorage.getItem("accessToken")
      .then(accessToken => {
        return axios.get(backURL + "/me", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        });
      })
      .then(res => {
        if (res.status == 200 && res.data) {
          const data = res.data;
          const personalData = [
            {
              label: "Prénom",
              value: `${data.firstname} ${data.lastname}`,
              icon: "account-circle"
            },
            {
              label: "Téléphone",
              value: data.phone,
              icon: "phone"
            },
            {
              label: "Email",
              value: data.email,
              icon: "email"
            }
          ];

          // Add addresses
          data.addresses.forEach((a, i) => {
            personalData.push({
              label: `Address${i !== 0 ? i : ""}`,
              value: a,
              icon: "home"
            });
          });

          const contractData = data.contracts.map((c, i) => {
            return [
              {
                label: `Usage Point ${i !== 0 ? i : ""}`,
                value: c.usage_point.usage_point_id
              },
              {
                label: `Usage Point Status ${i !== 0 ? i : ""}`,
                value: c.usage_point.usage_point_status
              },
              {
                label: `Meter Type ${i !== 0 ? i : ""}`,
                value: c.usage_point.meter_type
              },
              {
                label: `Contract segment ${i !== 0 ? i : ""}`,
                value: c.contracts.segment
              },
              {
                label: `Contract subscribed power ${i !== 0 ? i : ""}`,
                value: c.contracts.subscribed_power
              },
              {
                label: `Contract last activation date ${i !== 0 ? i : ""}`,
                value: c.contracts.last_activation_date
              },
              {
                label: `Contract distribution tariff ${i !== 0 ? i : ""}`,
                value: c.contracts.distribution_tariff
              },
              {
                label: `Contract distribution tariff change date ${
                  i !== 0 ? i : ""
                }`,
                value: c.contracts.last_distribution_tariff_change_date
              }
            ];
          });
          this.setState({ personalData, contractData });
        } else {
          throw new Error("No data from back");
        }
      })
      .catch(e => console.log(e));
  }

  renderContractData = contract => {
    return (
      <List>
        {contract.map((item, i) => {
          return (
            <ListItem
              key={i}
              title={item.value}
              hideChevron={true}
              subtitle={item.label}
            />
          );
        })}
      </List>
    );
  };

  render() {
    return (
      <ScrollView>
        <List>
          {this.state.personalData.map((item, i) => (
            <ListItem
              key={i}
              title={item.value}
              leftIcon={{ name: item.icon }}
              hideChevron={true}
            />
          ))}
        </List>
        {this.state.contractData.map(c => this.renderContractData(c))}
      </ScrollView>
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
