import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Login from "./src/components/Auth/Login";
import SignUp from "./src/components/Auth/Signup";
import Navigator from "./src/navigation/navigator";
import firebase from "./config/firebase";
import Main from "./src/containers/main/Main";

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
