import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { firebase } from "../../firebaseConfig";

const HomeScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "Anek-EB";
  const lvlFont = "Anek-SXB";

  const [data, setData] = useState("");
  // const [betacoins, setBetacoins] = useState(0);
  // const [levelProgress, setLevelProgress] = useState({
  //   levelProgress: { chapter: 1, stage: 1, substage: 1 },
  // });

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser.uid)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.exists) {
  //         setData(snapshot.data());
  //         console.log(snapshot.data());
  //       } else {
  //         console.log("User does not exist");
  //       }
  //     });
  // }, []);

  useEffect(() => {
    async function fetchData() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snapshot) => {
          setData(snapshot.data());
          console.log(snapshot.data());
        });
    }

    fetchData();
  }, []);
  return (
    <>
      <SafeAreaView className="flex-1 bg-red-500">
        <StatusBar style="auto" />
        <View className="bg-gray-50 flex-1">
          <View className=" h-14 flex-row bg-red-500 w-full justify-between items-center px-3">
            <View className="flex-row items-center pl-3">
              {data.firstName && (
                <Text
                  style={{ fontFamily: "Anek-SXB" }}
                  className="text-gray-50 pt-2 text-2xl"
                >
                  👋 Halo, {data.firstName}
                </Text>
              )}
              {/* <Fontisto name="flag" size={25} color={"#F9FAFB"} />
              <Text
                style={{ fontFamily: lvlFont }}
                className="text-gray-50 ml-3 mt-3 text-2xl"
              >
                | Pelajar
              </Text> */}
            </View>

            {data.currency?.betacoins && (
              <View className="flex-row items-center">
                <FontAwesome5 name="coins" size={24} color="white" />
                <Text
                  style={{ fontFamily: lvlFont }}
                  className="text-gray-50 ml-3 mt-3 text-2xl"
                >
                  {data.currency?.betacoins}
                </Text>
              </View>
            )}
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
              onPress={() => navigation.navigate("NoTabs", { level: 1 })}
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
                onPress={() => navigation.navigate("NoTabs", { level: 2 })}
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
