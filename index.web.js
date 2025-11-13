import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";

const rootTag = document.getElementById("root") || document.body;
AppRegistry.registerComponent("folkline3", () => App);
AppRegistry.runApplication("folkline3", { rootTag });
