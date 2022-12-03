import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StageScreen from "./StageScreen";
import { useLayoutEffect } from "react";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Anek-R": require("../../assets/fonts/AnekTelugu-Regular.ttf"),
    "Anek-B": require("../../assets/fonts/AnekTelugu-Bold.ttf"),
    "Anek-EB": require("../../assets/fonts/AnekTelugu-ExtraBold.ttf"),
    "Anek-EXB": require("../../assets/fonts/AnekTelugu_Expanded-Bold.ttf"),
    "Anek-SXB": require("../../assets/fonts/AnekTelugu_SemiExpanded-Bold.ttf"),
    // "Anek-CM": require("../../assets/fonts/AnekTelugu_Condensed-Medium.ttf"),
    // "Anek-SCB": require("../../assets/fonts/AnekTelugu_SemiCondensed-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "Anek-EB";
  const lvlFont = "Anek-SXB";
  return (
    <>
      <SafeAreaView className="flex-1 bg-red-500">
        <StatusBar style="auto" />
        <View className="bg-gray-50 flex-1">
          <View className=" h-14 flex-row bg-red-500 w-full justify-between items-center px-3">
            <View className="flex-row items-center pl-3">
              <Fontisto name="flag" size={25} color={"#F9FAFB"} />
              <Text
                style={{ fontFamily: lvlFont }}
                className="text-gray-50 ml-3 mt-3 text-2xl"
              >
                | Pelajar
              </Text>
            </View>

            <View className="flex-row items-center">
              <FontAwesome5 name="coins" size={24} color="white" />
              <Text
                style={{ fontFamily: lvlFont }}
                className="text-gray-50 ml-3 mt-3 text-2xl"
              >
                355
              </Text>
            </View>
          </View>
          <ScrollView className="px-7">
            <Text
              style={{ fontFamily: titleFont, fontSize: 30, marginTop: 30 }}
            >
              Bab 1 | Pemula
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor={c1}
              backgroundDarker={dc1}
              onPress={() => navigation.navigate("NoTabs")}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Anek-SXB",
                  alignSelf: "center",
                  color: "whitesmoke",
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
            <Text
              style={{ fontFamily: titleFont, fontSize: 30, marginTop: 30 }}
            >
              Bab 2 | Perantau
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor={c1}
              backgroundDarker={dc1}
              onPress={() => navigation.navigate("NoTabs")}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Anek-SXB",
                  alignSelf: "center",
                  color: "whitesmoke",
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
            <Text
              style={{ fontFamily: titleFont, fontSize: 30, marginTop: 30 }}
            >
              Bab 3 | Pelajar
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor={c1}
              backgroundDarker={dc1}
              onPress={() => navigation.navigate("NoTabs")}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Anek-SXB",
                  alignSelf: "center",
                  color: "whitesmoke",
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
            <Text
              style={{ fontFamily: titleFont, fontSize: 30, marginTop: 30 }}
            >
              Bab 4 | Pejuang
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor={c1}
              backgroundDarker={dc1}
              onPress={() => navigation.navigate("NoTabs")}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Anek-SXB",
                  alignSelf: "center",
                  color: "whitesmoke",
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
            <Text
              style={{ fontFamily: titleFont, fontSize: 30, marginTop: 30 }}
            >
              Bab 5 | Pahlawan
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor={c1}
              backgroundDarker={dc1}
              onPress={() => navigation.navigate("NoTabs")}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Anek-SXB",
                  alignSelf: "center",
                  color: "whitesmoke",
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
            <Text
              style={{ fontFamily: titleFont, fontSize: 30, marginTop: 30 }}
            >
              Bab 6 | Pendekar
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor={c1}
              backgroundDarker={dc1}
              onPress={() => navigation.navigate("NoTabs")}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text
                style={{
                  fontFamily: "Anek-SXB",
                  alignSelf: "center",
                  color: "whitesmoke",
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="mt-3 mb-20">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
                fontFamily={lvlFont}
              >
                <Text
                  style={{
                    fontFamily: "Anek-SXB",
                    alignSelf: "center",
                    color: "whitesmoke",
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

/* <View className="absolute h-16 rounded-t-xl bg-red-600 w-full bottom-0 justify-between px-5 flex-row items-center">
          <MaterialCommunityIcons
            name="medal-outline"
            size={32}
            color="white"
          />
          <Ionicons name="book-outline" size={32} color="white" />
          <TouchableOpacity>
            <Ionicons name="home" size={32} color="white" />
          </TouchableOpacity>
          <MaterialCommunityIcons
            name="map-marker-radius-outline"
            size={32}
            color="white"
          />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons name="person-outline" size={32} color="white" />
          </TouchableOpacity>
        </View> */

// const StageMenuScreen = ({ navigation }) => {
//   return (
//     <>
//       <SafeAreaView className="flex-1">
//         <StatusBar style="auto" />
//         <View className="bg-gray-50 flex-1">
//           <View className="bg-red-500 h-14 flex-row w-full justify-end items-center px-3">
//             <FontAwesome5 name="coins" size={24} color="white" />
//             <Text className="text-gray-50 ml-3 text-2xl font-bold">355</Text>
//           </View>
//           <View className="px-7">
//             <Text className="text-3xl font-bold py-10 mb-10">
//               Bab 1 - Permulaan
//             </Text>
//             <AwesomeButton
//               stretch={true}
//               height={40}
//               borderRadius={50}
//               backgroundColor="#EF4444"
//               backgroundDarker="#DC2626"
//               onPress={() => navigation.navigate("Home", { screen: "Stage" })}
//             >
//               Level 1
//             </AwesomeButton>
//             <View className="mt-3">
//               <AwesomeButton
//                 stretch={true}
//                 height={40}
//                 borderRadius={50}
//                 backgroundColor="#EF4444"
//                 backgroundDarker="#DC2626"
//                 style={{
//                   alignItems: "flex-start",
//                   justifyContent: "flex-start",
//                 }}
//               >
//                 Level 2
//               </AwesomeButton>
//             </View>
//             <View className="mt-3">
//               <AwesomeButton
//                 stretch={true}
//                 height={40}
//                 borderRadius={50}
//                 backgroundColor="#EF4444"
//                 backgroundDarker="#DC2626"
//               >
//                 Level 3
//               </AwesomeButton>
//             </View>
//             <View className="mt-3">
//               <AwesomeButton
//                 stretch={true}
//                 height={40}
//                 borderRadius={50}
//                 backgroundColor="#EF4444"
//                 backgroundDarker="#DC2626"
//               >
//                 Level 4
//               </AwesomeButton>
//             </View>
//             <View className="mt-3">
//               <AwesomeButton
//                 stretch={true}
//                 height={40}
//                 borderRadius={50}
//                 backgroundColor="#EF4444"
//                 backgroundDarker="#DC2626"
//               >
//                 Level 5
//               </AwesomeButton>
//             </View>
//             <View className="mt-3">
//               <AwesomeButton
//                 stretch={true}
//                 height={40}
//                 borderRadius={50}
//                 backgroundColor="#EF4444"
//                 backgroundDarker="#DC2626"
//               >
//                 Level 6
//               </AwesomeButton>
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//     </>
//   );
// };
