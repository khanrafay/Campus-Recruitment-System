import React, { useMemo, useState } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
} from "native-base";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import firebase, { auth } from "../../../config/firebase";
import { selectUserType, setActiveUser } from "../../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ navigation }) => {
  const userTypeSelector = useSelector(selectUserType);

  const [email, setEmail] = useState("a@b.com");
  const [password, setPassword] = useState("123321");
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState();

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "" && password === "") {
      setLoading(false);
      setError("Please fill in the required fields");
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          firebase
            .database()
            .ref(`${userType}/` + success.user.uid)
            .once("value")
            .then((snapshot) => {
              console.log("snapshot", snapshot.val());
              if (snapshot.val() !== null) {
                dispatch(
                  setActiveUser({
                    user: snapshot.val(),
                  })
                );
                if (userTypeSelector === "student") {
                  navigation.navigate("home");
                } else if (userTypeSelector === "company") {
                  navigation.navigate("company");
                } else {
                  navigation.navigate("admin");
                }
              } else {
                setLoading(false);
                setError("User does not exist");
              }
            });
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }
  };

  const userType = useMemo(() => {
    if (userTypeSelector === "student") {
      return " students";
    } else if (userTypeSelector === "company") {
      return " companies";
    } else {
      return "admin";
    }
  }, []);

  const loginText = useMemo(() => {
    if (userTypeSelector === "student") {
      return " Student";
    } else if (userTypeSelector === "company") {
      return " Company";
    } else {
      return " Admin";
    }
  }, []);
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item>
            <Input placeholder="Email" value={email} onChangeText={setEmail} />
          </Item>
          <Item last>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Item>
          <Button full style={styles.btnMargin} onPress={(e) => handleLogin(e)}>
            <Text style={styles.btnColor}>
              Continue as
              {loginText}
            </Text>
            {isLoading && (
              <ActivityIndicator
                style={{ paddingLeft: 5 }}
                size="small"
                color="white"
              />
            )}
          </Button>
          <Item style={{ textAlign: "center" }}>
            <Text style={{ textAlign: "center", color: "red" }}>{error}</Text>
          </Item>
          <Text style={{ textAlign: "center", marginTop: 5 }}>
            Don't have an account?{" "}
            <Text onPress={() => navigation.navigate("SignUp")}>Sign Up</Text>{" "}
            now
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  btnColor: {
    color: "white",
  },
  btnMargin: {
    marginTop: 5,
  },
});

export default Login;
