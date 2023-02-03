import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  SectionList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Modal from "react-native-modal";
import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { firebase } from "../../firebaseConfig";
import { Context } from "../constants/noCycle";
import { COLORS } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import RankSvg from "../components/RankSvg";

// TODO: Tambahin tombol di dummy build buat reset level abis selesai user (done!)

const HomeScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Lite" },
    { key: "second", title: "Silver (-20%)" },
    { key: "third", title: "Gold (-40%)" },
  ]);
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-b";
  const lvlFont = "epi-m";

  const [data, setData] = useState("");
  const { unlock, setUnlock, betacoins, setBetacoins } = useContext(Context);
  const midnightSecond = () => {
    let midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return (midnight.getTime() - new Date().getTime()) / 1000;
  };

  const [showModal, setShowModal] = useState(false);

  const FirstRoute = () => (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={{ padding: 15, fontFamily: "epi-b", fontSize: 30 }}>
          Beta Lite (1 Bulan)
        </Text>
        <Text style={{ paddingLeft: 15, fontFamily: "epi-b", fontSize: 20 }}>
          IDR 49.999 / Bulan
        </Text>
        <View
          className="gap-y-3"
          style={{
            backgroundColor: "#fff",
            marginTop: 15,
            width: "95%",
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 15,
            padding: 15,
            overflow: "hidden",
          }}
        >
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="advertisements-off" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Hilangkan iklan
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Belajar, bermain, bereksplorasi, dan belanja tanpa gangguan
                sedikitpun
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="hand-coin" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Dapat 10% lebih banyak Betacoins
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Hadiah Betacoins untuk setiap misi dan tantangan yang
                terselesaikan ditingkat jadi 10% lebih banyak
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="battery-arrow-up" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Tambah 2 slot energi maksimal
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Belajar bahasa lokal favoritmu dengan sesi-sesi yang lebih
                intensif
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="clock-fast" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Pulih energi 20% lebih cepat
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Balik ke sesi-sesi belajar bahasa lokal dengan lebih cepat
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="star-shooting" size={50} />
            <View className="flex-shrink">
              <Text
                style={{
                  fontFamily: "epi-b",
                  fontSize: 18,
                  lineHeight: 20,
                  marginBottom: 5,
                }}
              >
                Dapat badge ekslusif "Culture Supporter"
              </Text>
              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Tunjukki dukungan kamu pada aplikasi kami dengan gaya
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="handshake" size={50} />
            <View className="flex-shrink">
              <Text
                style={{
                  fontFamily: "epi-b",
                  fontSize: 18,
                  lineHeight: 20,
                  marginBottom: 5,
                }}
              >
                Dukung kemajuan edukasi budaya lokal
              </Text>
              <Text
                style={{ fontFamily: "epi-r", fontSize: 14, marginBottom: 10 }}
              >
                Bantu kami melestarikan budaya Indonesia
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-center items-center my-8">
          <MaterialCommunityIcons name={"clock-check-outline"} size={90} />
          <Text
            style={{
              marginTop: 10,
              fontFamily: "epi-b",
              fontSize: 24,
              marginBottom: 10,
            }}
          >
            Bisa batal kapanpun
          </Text>
          <Text
            className="text-center"
            style={{
              fontFamily: "epi-r",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Batal langganan kapanpun tanpa penalti ataupun biaya tambahan
          </Text>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 flex-row w-full h-16 border-t bg-white justify-center items-center">
        <TouchableOpacity
          onPress={() => setShowModal(false)}
          className={`rounded-lg h-12 px-2 py-1 mr-3 bg-red-500 border
  `}
        >
          <Text
            style={{ fontFamily: "epi-bl" }}
            className="mt-1 px-5 text-center  text-lg text-white"
          >
            Beli Babe Lite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={` rounded-lg h-12 px-2 py-1 bg-white border
  `}
          onPress={() => setShowModal(false)}
        >
          <Text
            style={{ fontFamily: "epi-bl" }}
            className="mt-1 px-5 text-center text-lg text-black"
          >
            Nanti
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const SecondRoute = () => (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={{ padding: 15, fontFamily: "epi-b", fontSize: 30 }}>
          Beta Silver (6 Bulan)
        </Text>
        <Text style={{ paddingLeft: 15, fontFamily: "epi-b", fontSize: 20 }}>
          IDR 39.999 / Bulan
        </Text>

        <View
          className="gap-y-3"
          style={{
            backgroundColor: "#fff",
            marginTop: 15,
            width: "95%",
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 15,
            padding: 15,
            overflow: "hidden",
          }}
        >
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="advertisements-off" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Basmi iklan
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Belajar, bermain, bereksplorasi, dan belanja tanpa gangguan
                sedikitpun
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="hand-coin" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Dapat 20% lebih banyak Betacoins
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Hadiah Betacoins untuk setiap misi dan tantangan yang
                terselesaikan ditingkat jadi 20% lebih banyak
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="battery-arrow-up" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Tambah 4 slot energi maksimal
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Belajar bahasa lokal favoritmu dengan sesi-sesi yang lebih
                intensif
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="clock-fast" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Pulih energi 35% lebih cepat
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Balik ke sesi-sesi belajar bahasa lokal dengan lebih cepat
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="star-shooting" size={50} />
            <View className="flex-shrink">
              <Text
                style={{
                  fontFamily: "epi-b",
                  fontSize: 18,
                  lineHeight: 20,
                  marginBottom: 5,
                }}
              >
                Dapat badge ekslusif "Culture Hero"
              </Text>
              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Tunjukki dukungan kamu pada aplikasi kami dengan gaya
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="handshake" size={50} />
            <View className="flex-shrink">
              <Text
                style={{
                  fontFamily: "epi-b",
                  fontSize: 18,
                  lineHeight: 20,
                  marginBottom: 5,
                }}
              >
                Dukung kemajuan edukasi budaya lokal
              </Text>
              <Text
                style={{ fontFamily: "epi-r", fontSize: 14, marginBottom: 10 }}
              >
                Bantu kami melestarikan budaya Indonesia
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-center items-center my-8">
          <MaterialCommunityIcons name={"clock-check-outline"} size={90} />
          <Text
            style={{
              marginTop: 10,
              fontFamily: "epi-b",
              fontSize: 24,
              marginBottom: 10,
            }}
          >
            Bisa batal kapanpun
          </Text>
          <Text
            className="text-center"
            style={{
              fontFamily: "epi-r",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Batal langganan kapanpun tanpa penalti ataupun biaya tambahan
          </Text>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 flex-row w-full h-16 border-t bg-white justify-center items-center">
        <TouchableOpacity
          className={`rounded-lg h-12 px-2 py-1 mr-3 bg-gray-400 border
  `}
          onPress={() => setShowModal(false)}
        >
          <Text
            style={{ fontFamily: "epi-bl" }}
            className="mt-1 px-5 text-center  text-lg text-blue-50"
          >
            Beli Babe Silver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={` rounded-lg h-12 px-2 py-1 bg-white border
  `}
          onPress={() => setShowModal(false)}
        >
          <Text
            style={{ fontFamily: "epi-bl" }}
            className="mt-1 px-5 text-center text-lg text-black"
          >
            Nanti
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const ThirdRoute = () => (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text style={{ padding: 15, fontFamily: "epi-b", fontSize: 30 }}>
          Beta Silver (12 Bulan)
        </Text>
        <Text style={{ paddingLeft: 15, fontFamily: "epi-b", fontSize: 20 }}>
          IDR 29.999 / Bulan (PALING HEMAT)
        </Text>
        <View
          className="gap-y-3"
          style={{
            backgroundColor: "#fff",
            marginTop: 15,
            width: "95%",
            alignSelf: "center",
            borderWidth: 1,
            borderRadius: 15,
            padding: 15,
            overflow: "hidden",
          }}
        >
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="advertisements-off" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Basmi iklan
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Belajar, bermain, bereksplorasi, dan belanja tanpa gangguan
                sedikitpun
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="hand-coin" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Dapat 25% lebih banyak Betacoins
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Hadiah Betacoins untuk setiap misi dan tantangan yang
                terselesaikan ditingkat jadi 25% lebih banyak
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="battery-arrow-up" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Tambah 5 slot energi maksimal
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Belajar bahasa lokal favoritmu dengan sesi-sesi yang lebih
                intensif
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="clock-fast" size={50} />
            <View className="flex-shrink">
              <Text
                style={{ fontFamily: "epi-b", fontSize: 18, marginBottom: 5 }}
              >
                Pulih energi 50% lebih cepat
              </Text>

              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Balik ke sesi-sesi belajar bahasa lokal dengan lebih cepat
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="star-shooting" size={50} />
            <View className="flex-shrink">
              <Text
                style={{
                  fontFamily: "epi-b",
                  fontSize: 18,
                  lineHeight: 20,
                  marginBottom: 5,
                }}
              >
                Dapat badge ekslusif "Culture Frontier"
              </Text>
              <Text
                style={{
                  fontFamily: "epi-r",
                  fontSize: 14,
                  marginBottom: 10,
                  lineHeight: 18,
                }}
              >
                Tunjukki dukungan kamu pada aplikasi kami dengan gaya
              </Text>
            </View>
          </View>
          <View className="flex-row gap-x-4 items-center">
            <MaterialCommunityIcons name="handshake" size={50} />
            <View className="flex-shrink">
              <Text
                style={{
                  fontFamily: "epi-b",
                  fontSize: 18,
                  lineHeight: 20,
                  marginBottom: 5,
                }}
              >
                Dukung kemajuan edukasi budaya lokal
              </Text>
              <Text
                style={{ fontFamily: "epi-r", fontSize: 14, marginBottom: 10 }}
              >
                Bantu kami melestarikan budaya Indonesia
              </Text>
            </View>
          </View>
        </View>
        <View className="justify-center items-center my-8">
          <MaterialCommunityIcons name={"clock-check-outline"} size={90} />
          <Text
            style={{
              marginTop: 10,
              fontFamily: "epi-b",
              fontSize: 24,
              marginBottom: 10,
            }}
          >
            Bisa batal kapanpun
          </Text>
          <Text
            className="text-center"
            style={{
              fontFamily: "epi-r",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            Batal langganan kapanpun tanpa penalti ataupun biaya tambahan
          </Text>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 flex-row w-full h-16 border-t bg-white justify-center items-center">
        <TouchableOpacity
          className={`rounded-lg h-12 px-2 py-1 mr-3 bg-yellow-500 border
  `}
          onPress={() => setShowModal(false)}
        >
          <Text
            style={{ fontFamily: "epi-bl" }}
            className="mt-1 px-5 text-center  text-lg text-white"
          >
            Beli Babe Gold
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={` rounded-lg h-12 px-2 py-1 bg-white border
  `}
          onPress={() => setShowModal(false)}
        >
          <Text
            style={{ fontFamily: "epi-bl" }}
            className="mt-1 px-5 text-center text-lg text-black"
          >
            Nanti
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

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

  const STAGE_BUTTONS = [
    {
      title: "Bab 1 | Pemula",
      data: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
      index: 0,
    },
    {
      title: "Bab 2 | Perantau",
      data: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
      index: 1,
    },
    {
      title: "Bab 3 | Pelajar",
      data: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
      index: 2,
    },
    {
      title: "Bab 4 | Pejuang",
      data: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
      index: 3,
    },
    {
      title: "Bab 5 | Pemberani",
      data: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
      index: 4,
    },
    {
      title: "Bab 6 | Pendekar",
      data: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
      index: 5,
    },
  ];

  const Item = ({ title, index }) => (
    <AwesomeButton
      stretch={true}
      height={40}
      borderRadius={50}
      backgroundColor={unlock >= index ? COLORS.secondary : "lightgray"}
      backgroundDarker={unlock >= index ? "forestgreen" : "darkgray"}
      backgroundShadow={COLORS.shadow}
      disabled={unlock >= index ? false : true}
      onPress={() => navigation.navigate("NoTabs", { level: index })}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "epi-b",
          alignSelf: "center",
          color: COLORS.white,
        }}
      >
        {title}
      </Text>
    </AwesomeButton>
  );

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff" }} className="flex-1">
        <StatusBar style="auto" />
        <Modal
          hasBackdrop={true}
          backdropOpacity={0.5}
          isVisible={showModal}
          className="flex-1 border m-0 justify-center items-center"
        >
          <View className="relative h-full w-full rounded-lg bg-primary">
            <View className="w-full justify-center items-center bg-white py-5 h-72 flex-row">
              <RankSvg name="Bronze" width={100} height={100} />
              <RankSvg name="Silver" width={100} height={100} />
              <RankSvg name="Gold" width={100} height={100} />
            </View>
            <TabView
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: "white" }}
                  tabStyle={{
                    backgroundColor: "black",
                    minHeight: 45,
                  }} // here
                  renderLabel={({ route, focused, color }) => (
                    <Text
                      style={{
                        color,
                        marginHorizontal: 8,
                        marginTop: 4,
                        fontFamily: "epi-b",
                      }}
                    >
                      {route.title}
                    </Text>
                  )}
                />
              )}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
            />

            <View
              style={{
                position: "absolute",
                top: 10,
                right: 15,
                backgroundColor: "#fff",
                paddingHorizontal: 8,
                borderRadius: 5,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "righteous",
                  fontSize: 24,
                  color: "black",
                }}
              >
                BABE
              </Text>
            </View>
          </View>
        </Modal>
        <View className="flex-1">
          <View
            style={{
              backgroundColor: "#fff",
              borderBottomColor: COLORS.secondary,
              borderBottomWidth: 0,
            }}
            className=" h-14 flex-row w-full justify-between items-center px-3"
          >
            <View className="flex-row items-center ml-4">
              <Ionicons name={"language"} size={20} color={COLORS.black} />
              <Text
                style={{ fontFamily: "epi-b", color: COLORS.black }}
                className=" ml-2  text-xl"
              >
                Betawi
              </Text>
              {/* {data.firstName && (
                <Text
                  style={{ fontFamily: "epi-m" }}
                  className="text-gray-50  text-2xl"
                >
                  👋 Halo, {data.firstName}
                </Text>
              )} */}
              {/* <Fontisto name="flag" size={25} color={"#F9FAFB"} />
              <Text
                style={{ fontFamily: lvlFont }}
                className="text-gray-50 ml-2  text-2xl"
              >
                | Pelajar
              </Text> */}
            </View>
            <View className="flex-row items-center">
              <View className="flex-row items-center ml-4">
                <FontAwesome5 name="fire" size={20} color={"orange"} />
                <Text
                  style={{ fontFamily: "epi-b", color: COLORS.black }}
                  className=" ml-2  text-xl"
                >
                  5
                </Text>
              </View>
              {data.currency?.betacoins && (
                <View className="flex-row items-center ml-4">
                  <FontAwesome5 name="coins" size={20} color={c1} />
                  <Text
                    style={{ fontFamily: "epi-b", color: COLORS.black }}
                    className=" ml-2  text-xl"
                  >
                    {data.currency?.betacoins}
                  </Text>
                </View>
              )}
              <View className="flex-row items-center ml-4">
                <FontAwesome5 name="bolt" size={20} color={"purple"} />
                <Text
                  style={{ fontFamily: "epi-b", color: COLORS.black }}
                  className=" ml-2  text-xl"
                >
                  2/4
                </Text>
              </View>
            </View>
          </View>
          <View className="bg-white border-t py-2  border-b px-6 flex-row items-center justify-center">
            <View className="relative flex-row items-center gap-x-3">
              <Badge
                style={{
                  borderRadius: 6,
                  fontFamily: "epi-b",
                  right: -20,
                  top: -5,
                  backgroundColor: "#F72F2F",
                }}
                className="absolute z-10"
              >
                -40%
              </Badge>
              <CountDown
                until={midnightSecond()}
                size={12}
                digitStyle={{
                  backgroundColor: "white",
                  borderColor: "#F72F2F",
                  borderWidth: 2,
                }}
                digitTxtStyle={{
                  color: "#F72F2F",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                timeToShow={["H", "M", "S"]}
                showSeparator={true}
                separatorStyle={{ color: "#F72F2F" }}
                timeLabelStyle={{ display: "none" }}
              />
              <TouchableOpacity
                className="border rounded-lg overflow-hidden"
                onPress={() => setShowModal(true)}
              >
                <LinearGradient
                  colors={["gold", "goldenrod"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ fontFamily: "epi-b", color: COLORS.black }}>
                    Aktivasikan Babe
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View className="absolute z-10 right-0 top-10 w-14 h-14 bg-primary border border-r-0 rounded-l-lg items-center justify-center">
              <FontAwesome5 name={"scroll"} size={30} color="#f5f5f5" />
            </View>
            <View className="absolute z-10 right-0 top-28 w-14 h-14 bg-primary border border-r-0 rounded-l-lg items-center justify-center">
              <MaterialIcons
                name={"leaderboard"}
                size={30}
                color="forestgreen"
              />
            </View>
            <SectionList
              contentContainerStyle={{
                paddingBottom: 80,
                backgroundColor: COLORS.primary,
              }}
              sections={STAGE_BUTTONS}
              stickySectionHeadersEnabled={false}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item, index, section }) => (
                <Item title={item} index={index + section.index * 6} />
              )}
              renderSectionHeader={({ section: { title } }) => (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.background,
                    backgroundColor: COLORS.secondary,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: titleFont,
                      color: COLORS.background,

                      fontSize: 24,
                      marginTop: 30,
                      marginBottom: 20,
                    }}
                  >
                    {title}
                  </Text>
                </View>
              )}
            ></SectionList>
          </View>

          {/* <ScrollView className="px-7">
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
                  fontFamily: "epi-m",
                  alignSelf: "center",
                  color: COLORS.white,
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor={c1}
                backgroundDarker={dc1}
              >
                <Text
                  style={{
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
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
                  fontFamily: "epi-m",
                  alignSelf: "center",
                  color: COLORS.white,
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
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
                  fontFamily: "epi-m",
                  alignSelf: "center",
                  color: COLORS.white,
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
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
                  fontFamily: "epi-m",
                  alignSelf: "center",
                  color: COLORS.white,
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
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
                  fontFamily: "epi-m",
                  alignSelf: "center",
                  color: COLORS.white,
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
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
                  fontFamily: "epi-m",
                  alignSelf: "center",
                  color: COLORS.white,
                  paddingTop: 5,
                }}
              >
                Level 1
              </Text>
            </AwesomeButton>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 2
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 3
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 4
                </Text>
              </AwesomeButton>
            </View>
            <View className="">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 5
                </Text>
              </AwesomeButton>
            </View>
            <View className=" mb-20">
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
                    fontFamily: "epi-m",
                    alignSelf: "center",
                    color: COLORS.white,
                    paddingTop: 5,
                  }}
                >
                  Level 6
                </Text>
              </AwesomeButton>
            </View>
          </ScrollView> */}
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
//             <FontAwesome5 name="coins" size={20} color="white" />
//             <Text className="text-gray-50 ml-2 text-2xl font-bold">355</Text>
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
//             <View className="">
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
//             <View className="">
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
//             <View className="">
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
//             <View className="">
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
//             <View className="">
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
