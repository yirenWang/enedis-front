import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryLegend
} from "victory-native";
import axios from "axios";

import { backURL } from "../config";
export default class DataScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, errorMessage: "", loading: false };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    };
  };

  componentDidMount() {
    // get data from backend (does not force refresh)
    this.getGraphData(this.props.navigation.getParam("slug"), false);
  }

  getGraphData = (slug, refresh) => {
    AsyncStorage.getItem("accessToken")
      .then(accessToken => {
        this.setState({ loading: true });
        return axios.get(
          `${backURL}/metering${refresh ? "/refresh" : ""}/${slug}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken ||
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZha2VJZCIsImlhdCI6MTUzNDY3MTgxNX0.hvlHTI1aJzYvMqVallSxndoszscVgUY-0EQEhwgYK6o"}`
            }
          }
        );
      })
      .then(res => {
        this.setState({ loading: false });
        if (res.status === 200) return res.data;
      })
      .then(data => {
        if (data.message) {
          this.setState({ errorMessage: data.message });
        } else {
          this.setState({ data });
        }
      })
      .catch(e => console.log(e));
  };

  // Create graph wil data from backend
  renderGraph = data => {
    return (
      <VictoryChart
        key={data.usagePointId}
        domainPadding={15}
        scale={{ x: "time" }}
      >
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          tickFormat={x => `${x}${data.metadata.unit}`}
        />
        <VictoryLegend
          x={150}
          y={10}
          centerTitle
          orientation="horizontal"
          data={[{ name: "", symbol: { fill: "white" } }]}
        />
        <VictoryBar
          style={{ data: { fill: "#c43a31" } }}
          data={data.graph_data.map(e => ({
            x: new Date(e.timestamp),
            y: parseInt(e.value, 10)
          }))}
        />
      </VictoryChart>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Actualiser les données sur les 10 derniers jours"
          onPress={() =>
            this.getGraphData(this.props.navigation.getParam("slug"), true)
          }
        />
        <Text> {this.state.errorMessage} </Text>
        <Text> {this.state.loading ? "Chargement ..." : ""} </Text>
        {this.state.data ? this.state.data.map(e => this.renderGraph(e)) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white"
  }
});
