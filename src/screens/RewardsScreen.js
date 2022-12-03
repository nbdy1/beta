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

const RewardsScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "Anek-EB";
  const lvlFont = "Anek-SXB";
  const REWARDS_DATA = [
    {
      id: "0",
      title: "Cashback 10% | Gopay",
      color1: "#DD5E89",
      color2: "#F7BB97",
    },
    {
      id: "1",
      title: "Diskon 20% untuk Produk XYZ",
      color1: "#1D976C",
      color2: "#93F9B9",
    },
    {
      id: "2",
      title: "Diskon 5% di Official Store Toped",
      color1: "#1A2980",
      color2: "#26D0CE",
    },
    {
      id: "3",
      title: "1 Tiket ke Monas",
      color1: "#AA076B",
      color2: "#61045F",
    },
    {
      id: "4",
      title: "Diskon 10% Hokben, KFC, atau A&W",
      color1: "#FF512F",
      color2: "#DD2476",
    },
    {
      id: "5",
      title: "Diskon 5% di Official Store Toped",
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
      title: "Cashback 5% Shopee",
      color1: "#3CA55C",
      color2: "#B5AC49",
    },
  ];
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity className="">
        <LinearGradient
          start={[0, 0]}
          end={[1, 0]}
          colors={[item.color1, item.color2]}
          className="w-full mb-5 justify-center max-w-full px-3 rounded-2xl h-20"
        >
          <Text
            style={{ fontFamily: lvlFont }}
            className="text-lg pl-3 text-white shadow-lg"
          >
            {item.title}
          </Text>
          <TouchableOpacity className="self-end absolute bottom-2 right-2 px-2 py-1 rounded-full">
            {/* <Text style={{ fontFamily: "Anek-B" }}>Cek sekarang</Text> */}
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="auto" />
      <View className="h-15 flex-row items-center bg-slate-100">
        <Text style={{ fontFamily: lvlFont }} className="text-4xl px-5 pt-8">
          Harta Karun
        </Text>
        <MaterialCommunityIcons
          name="treasure-chest"
          size={35}
          color="orange"
        />
      </View>
      <View className="flex-1 bg-gray-50 pl-3 w-full">
        <Text
          style={{ fontFamily: "Anek-B" }}
          className="text-black text-xl px-5 pb-5 pr-5 pt-5"
        >
          Kumpulkan poin untuk mendapatkan hadiah-hadiah seru!
        </Text>
        <FlatList
          data={REWARDS_DATA}
          renderItem={renderItem}
          className="pr-3"
        />
      </View>
    </SafeAreaView>
  );
};

export default RewardsScreen;
