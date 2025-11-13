import React from "react";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: "#1B2632", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#FFB162", fontSize: 24 }}>🏠 Ecranul Home este vizibil!</Text>
    </View>
  );
}
