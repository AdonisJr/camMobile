import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function CollapseNavbar({
  handleNavbar,
  activePage,
  handleActivePage,
}) {
  return (
    <View className="flex-col p-2 w-48 items-center justify-center h-screen bg-neutral-700 opacity-80 absolute left-0 top-0 z-50">
      <View className="absolute top-10 right-5">
        <TouchableOpacity
          className="flex h-10 w-10 rounded-full items-center justify-center"
          onPress={() => handleNavbar(false)}
        >
          <Text className="text-white text-center text-lg">X</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className={`flex-row items-center mb-5 w-44 rounded-lg gap-1 p-2 bg-white ${
          activePage === "REPORT CRIME" ? 'bg-slate-200': ''
        }`}
        onPress={() => {
          handleActivePage("REPORT CRIME");
          handleNavbar(false);
        }}
      >
        <FontAwesome5 name="crosshairs" color="black" size={20} />
        <Text className="">REPORT CRIME</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center mb-5 w-44 rounded-lg gap-1 p-2 bg-white"
        onPress={() => {
          handleActivePage("WANTED PERSON");
          handleNavbar(false);
        }}
      >
        <FontAwesome5 name="users-slash" color="black" size={20} />
        <Text className="">WANTED PERSON</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center mb-5 w-44 rounded-lg gap-1 p-2 bg-white"
        onPress={() => {
          handleActivePage("MISSING PERSON");
          handleNavbar(false);
        }}
      >
        <MaterialIcons name="person-search" color="black" size={24} />
        <Text className="">MISSING PERSON</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center mb-5 w-44 rounded-lg gap-1 p-2 bg-white"
        onPress={() => {
          handleActivePage("REPORT HISTORY");
          handleNavbar(false);
        }}
      >
        <FontAwesome5 name="history" color="black" size={20} />
        <Text className="">REPORT HISTORY</Text>
      </TouchableOpacity>
    </View>
  );
}
