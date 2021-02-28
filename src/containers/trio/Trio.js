import { Button, Container, H3, Text, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setUserType } from "../../../features/userSlice";

function Trio({ navigation }) {
  const dispatch = useDispatch();

  const handleStudent = () => {
      console.log('here')
    dispatch(
      setUserType({
        userType: "student",
      })
    );
    navigation.navigate("Login");
  };

  const handleCompany = () => {
    dispatch(
      setUserType({
        userType: "company",
      })
    );
    navigation.navigate("Login");
  };


  const handleAdmin = () => {
    dispatch(
      setUserType({
        userType: "admin",
      })
    );
    navigation.navigate("Login");
  };



  return (
    <Container style={styles.container}>
      <View style={{ textAlign: "center" }}>
        <H3>Start using CRS</H3>
      </View>
      <View>
        <Button full success onPress={() => handleStudent()}>
          <Text>Continue as Student</Text>
        </Button>
      </View>
      <View>
        <Button
          full
          warning
          onPress={() => handleCompany()}
        >
          <Text>Continue as Company</Text>
        </Button>
      </View>
      <View>
        <Button
          full
          info
          onPress={() => handleAdmin()}
        >
          <Text>Continue as Admin</Text>
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default Trio;
