import React, { useState } from "react";
import { Text, View, Alert, Image, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
// import Svg, { Path } from "react-native-svg";

const index = () => {
  const [credential, setCredential] = useState({});

  const handleEmail = (e) => {
    setCredential({ ...credential, email: e.nativeEvent.text });
  };
  const handlePassword = (e) => {
    setCredential({ ...credential, password: e.nativeEvent.text });
  };

  const _getToken = async () => {
    const token = await AsyncStorage.getItem('user');
    if(token){
      router.replace('/');
    }
  }

  const handleSubmit = async () => {
    if(!credential.password) return Alert.alert("Error Message", "Password required.")
    try {
      const result = await fetch(`http://192.168.43.141:3001/api/auth`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      })
        .then((res) => res.json())
          console.log(result.status)
        if(result.status === 200){
          await AsyncStorage.setItem('user', result.data)
          // Alert.alert("Login Success", "Welcome to my App!");
          setTimeout(() => {
            router.replace('/');
          }, 2000)
          
        }else{
          Alert.alert(result.error, result.message)
        }
          // Alert.alert("Login Success", "Welcome to my App!");
        // });
        
    } catch (e) {
      console.error(e);
    }
  };
  useState(()=>{
    _getToken()
  },[])
  return (
    <SafeAreaView className="flex-1 w-full justify-center items-center">
      <View>
        <Text>LOGIN</Text>
      </View>
      <View className="flex gap-3 w-full p-5 px-5">
        <TextInput
          className="border-b-2 border-slate-400 py-2 px-5"
          onChange={handleEmail}
          placeholder="Email"
        ></TextInput>
        <TextInput
          className="border-b-2 border-slate-400 py-2 px-5"
          onChange={handlePassword}
          placeholder="Password"
        ></TextInput>
      </View>
      <View className="w-full p-5">
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-full"
          onPress={handleSubmit}
        >
          <Text className="w-full text-center text-white font-semibold text-lg">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
