import { Button, Text, View } from "native-base";
import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {useDispatch} from "react-redux";
import { auth } from "../../../config/firebase";
import { setUserLogoutState } from "../../../features/userSlice";

function Dashboard({ navigation }) {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dashboard",
      headerStyle: { backgroundColor: "green" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: null,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity>
            <Button
              transparent
              onPress={() => {
                handleLogout();
              }}
            >
              <Text>Logout</Text>
            </Button>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    auth.signOut();
    dispatch(setUserLogoutState());
    navigation.navigate("Trio");
  };

  return (
    <View>
      <Text>Welcome to componay dashboard</Text>
      
    </View>
  );
}

export default Dashboard;
