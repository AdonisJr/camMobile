import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { Link, router } from "expo-router";
import MainContent from "../src/components/MainContent";
import { useEffect, useState } from "react";
import CollapseNavbar from "../src/components/CollapseNavbar";
import ReportCrime from "../src/components/crime/ReportCrime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


export default function App() {
  const [isNavOpen, setNavOpen] = useState(false);
  const [activePage, setActivePage] = useState("REPORT CRIME");
  const [user, setUser] = useState({});

  const handleNavbar = (action) => {
    setNavOpen(action);
  };

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  const _getToken = async () => {
    const token = await AsyncStorage.getItem("user");
    if (!token) {
      setUser({});
      router.replace("/login");
    }
  };

  const _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      if (token !== null) {
        const key = process.env.EXPO_PUBLIC_ACCESS_TOKEN_SECRET;
        const officer = await JWT.decode(token, key, { timeSkew: 30});
        const details = await fetch(
          `http://192.168.43.141:3001/officer/?id=${officer.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());

        setUser({...user, data: details.data, accessToken: token});
      }
    } catch (error) {
      console.log('wewe'+error);
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    _getToken();
  }, []);

  // useEffect(() => {}, [isNavOpen]);
  return (
    <View className="flex-1 items-center justify-between bg-slate-200">
      <Header handleNavbar={handleNavbar} user={user} />
      {isNavOpen ? (
        <CollapseNavbar
          handleNavbar={handleNavbar}
          activePage={activePage}
          handleActivePage={handleActivePage}
        />
      ) : (
        ""
      )}
      <View className="flex-1 justify-center items-center w-full z-0">
        {/* <Link href="/login" asChild>
          <Pressable>
            <Text>Login Path Sample</Text>
          </Pressable>
        </Link> */}
        <View>
          <View className="flex-row items-center mt-4 font-bold p-4 rounded-t-2xl bg-white">
            <View className="mx-2">
              {activePage === "REPORT CRIME" ? (
                <FontAwesome5 name="crosshairs" color="black" size={20} />
              ) : (
                ""
              )}
            </View>
            <Text className="text-center font-bold text-xl mx-2">
              {activePage}
            </Text>
          </View>
        </View>
        {activePage === "REPORT CRIME" ? <ReportCrime user={user} /> : ""}
      </View>
      {/* <Footer /> */}
      <StatusBar
        animated={true}
        backgroundColor="white"
        handleActivePage={handleActivePage}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
