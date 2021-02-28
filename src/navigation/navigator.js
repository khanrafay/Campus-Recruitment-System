import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/Signup";
import home from "../containers/students/home";
import { Provider } from "react-redux";
import store from "../../store/store";
import firebase from "../../config/firebase";
import Trio from "../containers/trio/Trio";
import Dashboard from "../containers/company/Dashboard";
import AdminDashboard from "../containers/admin/AdminDashboard";

const Stack = createStackNavigator();

function Navigator() {
  useEffect(() => {
    if (firebase.auth().currentUser) {
      console.log("heree");
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .once("value")
        .then((snapshot) => {
          dispatch(
            setActiveUser({
              user: snapshot.val(),
            })
          );
        });
    } else {
    }
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Trio" component={Trio} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="home" component={home} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="company" component={Dashboard} />
          <Stack.Screen name="admin" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigator;
