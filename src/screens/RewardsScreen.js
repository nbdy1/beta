import React from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Betacoin from "../../assets/svg/betacoin.svg";
import { TextInput } from "react-native-paper";

const RewardsScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-bl";
  const lvlFont = "epi-b";
  const REWARDS_DATA = [
    {
      id: "0",
      title: "2x Cashback 10% | GoCar",
      color1: "#DD5E89",
      color2: "#F7BB97",
    },
    {
      id: "1",
      title: "Diskon 20% untuk Air Fryer Philips",
      color1: "#1D976C",
      color2: "#93F9B9",
    },
    {
      id: "2",
      title: "Diskon 10% di Official Store Toped",
      color1: "#1A2980",
      color2: "#26D0CE",
    },
    {
      id: "3",
      title: "2 Tiket ke Ancol",
      color1: "#AA076B",
      color2: "#61045F",
    },
    {
      id: "4",
      title: "5x Voucher Diskon 10% Hokben",
      color1: "#FF512F",
      color2: "#DD2476",
    },
    {
      id: "5",
      title: "2x Diskon 5% di Official Store Toped",
      color1: "#F09819",
      color2: "#EDDE5D",
    },
    {
      id: "6",
      title: "Beli 2 Box Masker Gratis 1 ",
      color1: "#E55D87",
      color2: "#5FC3E4",
    },
    {
      id: "7",
      title: "2x Cashback 5% Shopee",
      color1: "#3CA55C",
      color2: "#B5AC49",
    },
    {
      id: "8",
      title: "2 Tiket ke Ocean Park BSD",
      color1: "#AA076B",
      color2: "#61045F",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          colors={[item.color1, item.color2]}
          className="w-full border relative mb-5 justify-center max-w-full px-3 rounded-2xl h-20"
        >
          <Text
            style={{ fontFamily: "epi-b" }}
            className="text-lg pl-3 text-whit shadow-lg"
          >
            {item.title}
          </Text>
          <TouchableOpacity className="self-end absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-primary border flex-row items-center gap-x-1">
            <Text className="text-black" style={{ fontFamily: "epi-b" }}>
              5.000
            </Text>
            <Betacoin width={20} height={20} />
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <StatusBar style="auto" />
      <View className="h-15 py-8 flex-row items-center bg-secondary border-b border-t-0">
        <Text style={{ fontFamily: lvlFont }} className="text-4xl pl-5 pr-2">
          Harta Karun
        </Text>
        <MaterialCommunityIcons name="treasure-chest" size={35} color="black" />
      </View>
      <View className="flex-1 bg-gray-50 pl-3 w-full">
        <Text
          style={{ fontFamily: "epi-m" }}
          className="text-black text-lg px-5 pb-5 pr-5 pt-5"
        >
          Kumpulkan Betacoins untuk mendapatkan hadiah-hadiah seru!
        </Text>
        <View
          className="gap-x-2"
          style={{
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ height: 42, width: "65%", borderWidth: 1 }}
            placeholder="Kode Redeem"
          ></TextInput>
          <TouchableOpacity className="bg-primary rounded-lg border px-3 py-2">
            <Text
              style={{ fontFamily: "epi-m" }}
              className="text-black text-md"
            >
              Redeem
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{ paddingBottom: 70 }}
          data={REWARDS_DATA}
          renderItem={renderItem}
          className="pr-3"
        />
      </View>
    </SafeAreaView>
  );
};

export default RewardsScreen;
