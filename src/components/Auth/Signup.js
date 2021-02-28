import React, { useMemo, useState } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Picker,
} from "native-base";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-datepicker";
import firebase, { auth } from "../../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  selectUserType,
  setActiveUser,
} from "../../../features/userSlice";

const SignUp = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("09-10-2020");
  const [error, setError] = useState();
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userSelector = useSelector(selectUser);
  const userTypeSelector = useSelector(selectUserType);

  const handleSignUp = (e) => {
    setLoading(true);
    e.preventDefault();
    if (userName === "" && email === "" && password === "") {
      setError("Please enter the required fields");
      setLoading(false);
    } else {
      setError("");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((success) => {
          let databaseRef = firebase
            .database()
            .ref(`${userType}/${success.user.uid}`)
            .set({
              name: userName,
              email: email,
              gender: gender,
              dob: dob,
              type: userTypeSelector,
            })
            .then((snapshot) => {
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
                })
                .catch((err) => {
                  console.log("disptach err", err.message);
                  setLoading(false);
                  setError(err.message);
                });

              setLoading(false);
              if (userTypeSelector === "student") {
                navigation.navigate("home");
              } else if (userTypeSelector === "company") {
                navigation.navigate("company");
              } else {
                navigation.navigate("admin");
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log("err in data saving");
            });
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          console.log("err =>>", err);
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
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item>
            <Input
              placeholder="Username"
              value={userName}
              onChangeText={setUserName}
            />
          </Item>
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
          <Item>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={gender}
                onValueChange={setGender}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </Item>
          </Item>
          <Item picker>
            <DatePicker
              style={{ width: 350 }}
              date={dob}
              mode="date"
              placeholder="Select date of birth"
              format="YYYY-MM-DD"
              minDate="1990-01-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(e) => setDob(e)}
            />
          </Item>
          <Button
            full
            style={styles.btnMargin}
            onPress={(e) => handleSignUp(e)}
          >
            <Text style={styles.btnColor}>SignUp</Text>
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
            Already have an account? Login now
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default SignUp;
