import { View, Text, Alert } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Link, router } from "expo-router";

export default function UserDropDown({ user }) {
  const logout = async () => {
    await AsyncStorage.removeItem("user")
      .then((value) => {
        return router.replace('/login')
      })
      .catch((error) => {
        Alert.alert("error");
      });
  };
  return (
    <View className="flex justify-center absolute border-2 w-40 h-32 border-neutral-400 bg-white z-50 -bottom-24 right-7">
      <View className="absolute right-0 -top-4 w-0 h-0 border-8 border-transparent border-b-white border-opacity-100"></View>
      {/* <View className="w-5 h-3 border-2 border-top- rounded-tl-3xl rounded-tr-2xl bg-white right-0 -top-2 absolute"></View> */}
      <View className="flex-row gap-2 items-center justify-center w-full my-2 p-2">
        <FontAwesome5 name="user-cog" color="black" size={20} />
        <Text>{user.data?.last_name + ", " + user.data?.first_name}</Text>
      </View>
      <View className="border-b-2 border-neutral-200 my-2 mx-1"></View>
      <TouchableOpacity
        className="flex-row gap-2 py-2 mx-1 p-1"
        onPress={logout}
      >
        <FontAwesome name="sign-out" color="black" size={20} />
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
