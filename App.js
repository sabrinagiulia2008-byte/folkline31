import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Account from "./src/screens/Account";
import Add from "./src/screens/Add";
import Explore from "./src/screens/Explore.web";
import Home from "./src/screens/Home";
import Messages from "./src/screens/Messages";

export default function App() {
  const [screen, setScreen] = useState("Home");

  const renderScreen = () => {
    switch (screen) {
      case "Home": return <Home />;
      case "Explore": return <Explore />;
      case "Add": return <Add />;
      case "Messages": return <Messages />;
      case "Account": return <Account />;
      default: return <Home />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <View style={styles.tabBar}>
        {["Home","Explore","Add","Messages","Account"].map(name => (
          <TouchableOpacity
            key={name}
            onPress={() => setScreen(name)}
            style={[styles.tab, screen === name && styles.activeTab]}
          >
            <Text style={[styles.tabText, screen === name && styles.activeText]}>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:"#1B2632" },
  content: { flex:1 },
  tabBar: { flexDirection:"row", backgroundColor:"#1B2632", height:70, borderTopWidth:1, borderColor:"#2C3B4D" },
  tab: { flex:1, justifyContent:"center", alignItems:"center" },
  activeTab: { backgroundColor:"#2C3B4D" },
  tabText: { color:"#C9C1B1", fontSize:12 },
  activeText: { color:"#FFB162" }
});
