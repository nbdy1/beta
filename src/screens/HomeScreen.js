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
import Betacoin from "../../assets/svg/betacoin.svg";
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
    { key: "first", title: "Baru!" },
    { key: "second", title: "Gue! (-20%)" },
    { key: "third", title: "Pro! (-40%)" },
  ]);
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-b";
  const lvlFont = "epi-m";

  const [data, setData] = useState(null);
  const { unlock, setUnlock, betacoins, setBetacoins } = useContext(Context);
  const midnightSecond = () => {
    let midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return (midnight.getTime() - new Date().getTime()) / 1000;
  };
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setData(snapshot.data());
          console.log(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);

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
          Beta Baru! (1 Bulan)
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
            Beli Babe Baru!
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
          Beta Gue! (6 Bulan)
        </Text>
        <Text style={{ paddingLeft: 15, fontFamily: "epi-b", fontSize: 20 }}>
          IDR 39.999 / Bulan (IDR 239.994)
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
            Beli Babe Gue!
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
          IDR 29.999 / Bulan (IDR 359.988)
        </Text>
        <Text style={{ paddingLeft: 15, fontFamily: "epi-b", fontSize: 20 }}>
          Paling Hemat!
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
            Beli Babe Pro!
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
      borderWidth={1}
      backgroundColor={unlock >= index ? COLORS.secondary : "lightgray"}
      backgroundDarker={unlock >= index ? "forestgreen" : "darkgray"}
      backgroundShadow={COLORS.black}
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
      <SafeAreaView
        style={{ backgroundColor: COLORS.primary }}
        className="flex-1"
      >
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
              backgroundColor: COLORS.primary,
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
            </View>
            <View className="flex-row items-center">
              <View className="flex-row items-center ml-4">
                <FontAwesome5 name="fire" size={20} color={"white"} />
                <Text
                  style={{ fontFamily: "epi-b", color: COLORS.black }}
                  className=" ml-2  text-xl"
                >
                  5
                </Text>
              </View>
              {data?.currency?.betacoins ? (
                <View className="flex-row items-center ml-4">
                  <Betacoin width={30} height={30} />
                  <Text
                    style={{ fontFamily: "epi-b", color: COLORS.black }}
                    className=" ml-2  text-xl"
                  >
                    {data.currency?.betacoins}
                  </Text>
                </View>
              ) : null}
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
          <View className="bg-secondary border-t py-2  border-b px-6 flex-row items-center justify-center">
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
                  backgroundColor: "#F72F2F",
                  borderColor: "black",
                  borderWidth: 1,
                }}
                digitTxtStyle={{
                  color: "#ffffff",
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
                  colors={["pink", "hotpink", "pink"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
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
            <View className="absolute z-10 right-0 top-10 w-14 h-14 bg-white border border-r-0 rounded-l-lg items-center justify-center">
              <FontAwesome5 name={"scroll"} size={30} color={COLORS.primary} />
            </View>
            <View className="absolute z-10 right-0 top-28 w-14 h-14 bg-white border border-r-0 rounded-l-lg items-center justify-center">
              <MaterialIcons
                name={"leaderboard"}
                size={30}
                color="forestgreen"
              />
            </View>
            <SectionList
              contentContainerStyle={{
                paddingBottom: 200,
                backgroundColor: "white",
                paddingHorizontal: 10,
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
                    borderBottomColor: COLORS.background,
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
