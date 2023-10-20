import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserDropDown from "./UserDropDown";

export default function Header({ handleNavbar, user }) {
  const [isDropdownOpen, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!isDropdownOpen);
  };
  return (
    <View className="flex-row w-screen items-center justify-between gap-2 px-5 pt-14 pb-10 bg-neutral-700 z-40 relative">
      <View className="flex items-center justify-center rounded-full p-2 w-10 h-10 hover:bg-red-500">
        <TouchableOpacity onPress={() => handleNavbar(true)}>
          <Icon name="stream" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleDropdown}>
        <View className="flex items-center justify-center rounded-full bg-yellow-700 p-2 w-10 h-10">
          <Icon name="user-alt" color="white" size={20} />
        </View>
      </TouchableOpacity>
      {isDropdownOpen ? <UserDropDown user={user} /> : ""}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
