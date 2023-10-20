import { View, Text, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";
import io from 'socket.io-client';
const socket = io.connect("http://192.168.43.141:3001");

import * as Location from "expo-location";

export default function ReportCrime({ user }) {
  const [reportDetails, setReportDetails] = useState({
    suspect: "",
    type_of_crime: "murder",
    witness: "",
    description: "",
    other_information: "",
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async () => {
    if (errorMsg)
      return Alert.alert("Internal Server Error", "Something went wrong");
    let latitude = "";
    let longitude = "";

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let data = await Location.getCurrentPositionAsync({});
    if(data){
      latitude = data.coords.latitude;
      longitude = data.coords.longitude;
    }else{
      Alert.alert('Location Error', "Can't find location.")
    }
    
    const details ={
      latitude,
      longitude,
      officer_id: user.data.id,
      type_of_crime: reportDetails.type_of_crime,
      description: reportDetails.description,
      witness: reportDetails.witness,
      other_information: reportDetails.other_information
    }

    const result = await fetch(`http://192.168.43.141:3001/crime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(details)
    }).then((res) => res.json());

    if(result.status === 200){
      Alert.alert('Success Message', result.message)
      socket.emit('send_message',{message: 'hello'})
    }else{
      Alert.alert(result.error, result.message)
    }
  };

  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <ScrollView className="w-full">
      {/* SUSPECT */}
      <View className="flex-1 w-full p-4 bg-white">
        <View>
          <Text className="mb-2 px-4 font-bold">SUSPECT</Text>
          <TextInput
            className="border-2 mb-4 border-slate-400 p-2 rounded-lg"
            onChange={(e) =>
              setReportDetails({
                ...reportDetails,
                suspect: e.nativeEvent.text,
              })
            }
          ></TextInput>
        </View>
        {/* TYPE OF CRIME */}
        <View>
          <Text className="mb-2 px-4 font-bold">TYPE OF CRIME</Text>
          <View className="border-2 mb-4 border-slate-400 rounded-lg">
            <ScrollView>
              <Picker
                selectedValue={reportDetails.type_of_crime}
                onValueChange={(itemValue, itemIndex) =>
                  setReportDetails({
                    ...reportDetails,
                    type_of_crime: itemValue,
                  })
                }
              >
                <Picker.Item label="Theft" value="theft" />
                <Picker.Item label="Robbery" value="robbery" />
                <Picker.Item label="Homicide " value="homicide " />
                <Picker.Item label="Murder" value="murder" />
                <Picker.Item label="Burglary" value="burglary" />
                <Picker.Item label="Assault" value="assault" />
                <Picker.Item label="Child Abuse" value="child abuse" />
                <Picker.Item
                  label="Human Trafficking"
                  value="human trafficking"
                />
                <Picker.Item label="Kidnapping" value="kidnapping" />
              </Picker>
            </ScrollView>
          </View>
        </View>
        {/* DESCRIPTION */}
        <View>
          <Text className="mb-2 px-4 font-bold">DESCRIPTION</Text>
          <TextInput
            className="border-2 mb-4 border-slate-400 p-2 rounded-lg"
            multiline
            onChange={(e) =>
              setReportDetails({
                ...reportDetails,
                description: e.nativeEvent.text,
              })
            }
          ></TextInput>
        </View>
        <View>
          <Text className="mb-2 px-4 font-bold">WITNESS</Text>
          <TextInput
            className="border-2 mb-4 border-slate-400 p-2 rounded-lg"
            onChange={(e) =>
              setReportDetails({
                ...reportDetails,
                witness: e.nativeEvent.text,
              })
            }
          ></TextInput>
        </View>
        <View>
          <Text className="mb-2 px-4 font-bold">OTHER INFORMATION</Text>
          <TextInput
            className="border-2 mb-4 border-slate-400 p-2 rounded-lg"
            multiline
            onChange={(e) =>
              setReportDetails({
                ...reportDetails,
                other_information: e.nativeEvent.text,
              })
            }
          ></TextInput>
        </View>
        <TouchableOpacity
          className="flex-row items-center justify-center bg-yellow-600 rounded-lg mb-8 p-2"
          onPress={handleSubmit}
        >
          <MaterialIcons name="report" color="white" size={40} />
          <Text className="text-center text-white font-bold">SEND REPORT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
