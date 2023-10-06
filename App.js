import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function App() {
  return (
    <View className="flex-1 items-center justify-between">
      <View className="flex-row w-screen items-center justify-between gap-2 px-5 py-10 bg-slate-400">
        <View className="flex items-center justify-center rounded-full p-2 w-10 h-10 hover:bg-red-500">
          <Icon name="stream" color="white" size={20} />
        </View>
        <View className="flex items-center justify-center rounded-full bg-black p-2 w-10 h-10">
          <Icon name="user-alt" color="white" size={20} />
        </View>
      </View>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
