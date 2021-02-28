import { Button, Form, Input, Item, Label, Text, View } from "native-base";
import React, { useLayoutEffect, useState } from "react";
import { selectUser, setUserLogoutState } from "../../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../../config/firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";


function home({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dashboard",
      headerStyle: { backgroundColor: "yellow" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: null,
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity>
            <Button transparent onPress={() => {handleLogout()}}>
              <Text>Logout</Text>
            </Button>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log("user", user);

  const handleLogout = () => {
    auth.signOut();
    dispatch(setUserLogoutState());
    navigation.navigate("Trio");
  };

  const [gpa, setGpa] = useState("");
  const [resume, setResume] = useState();
  const [isLoading, setLoading] = useState(false);

  // const selectDocument = async() => {
  //   try{
  //     const res = await DocumentPicker.pick({
  //       type:[DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.doc],
  //     });
  //     const fileName = res.uri.replace("files://","")
  //     let data = ''
  //     RNFetchBlob.fs.readStream(
  //       fileName,
  //       'base64',
  //       4095)
  //       .then((ifstream) => {
  //         ifstream.open()
  //         ifstream.onData((data) => {
  //           console.log('check data if stream =>>', data);
  //           let base64 = `data:${res.type};base65,` + data
  //           const param = {
  //             base64: base64,
  //             width:300,
  //             height:300,
  //             name: res.name,
  //             type: res.type,
  //             size:7391,
  //             fileName: res.name
  //           }
  //           console.log('param check =>>>', param)
  //         })
  //         ifstream.onError((err) => {
  //           console.log('oops', err)
  //         })
  //       }
  //     )

  //   }catch(err){
  //         if(DocumentPicker.isCancel(err)){
  //           console.log('cancelled')
  //         }else{
  //           console.log('err', err)
  //         }
  //       }
  // }

  // const selectDocument = async() => {
  //   try{
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     console.log('check files', res)
  //   }
  //   catch(err){
  //     if(DocumentPicker.isCancel(err)){
  //       console.log('cancelled')
  //     }else{
  //       console.log('err', err)
  //     }
  //   }
  // }

  const handleSave = () => {};
  return (
    <View>
      <Text style={{ textAlign: "center", marginTop: 10 }}>
        Student Dashboard
      </Text>
      <Form>
        <Item floatingLabel>
          <Label>GPA</Label>
          <Input value={gpa} onChangeText={setGpa} />
        </Item>
        {/* <Item>
          <Button title="Choose File" onPress={selectDocument} />
        </Item> */}

        <Button style={{ marginTop: 10 }} full onPress={(e) => handleSave(e)}>
          <Text style={{ color: "white" }}>Save</Text>
          {isLoading && (
            <ActivityIndicator
              style={{ paddingLeft: 5 }}
              size="small"
              color="white"
            />
          )}
        </Button>
      </Form>
    </View>
  );
}

export default home;
