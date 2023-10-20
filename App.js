import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-between bg-slate-200">
      <Header />
      <View className="flex-1 w-full p-2 justify-start">
        <Text className="text-red-400">WEwewsssss</Text>
      </View>
      <Footer />
      <StatusBar animated={true} backgroundColor="#a6a831" />
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
