import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../constants";
import { shadowBrutal } from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import QText from "../components/QText";
import { IconButton, MD3Colors } from "react-native-paper";
import Modal from "react-native-modal";
import Betacoin from "../../assets/svg/betacoin.svg";
import MaskedView from "@react-native-masked-view/masked-view";

const ExploreScreen = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.primary }}
      className="flex-1"
    >
      <Modal
        hasBackdrop={true}
        backdropOpacity={0.5}
        isVisible={showModal}
        className="flex-1 border m-0 justify-center items-center"
      >
        <View className="relative border h-1/2 w-3/4 rounded-lg bg-primary"></View>
      </Modal>
      <View
        style={{
          backgroundColor: COLORS.primary,
          borderBottomColor: COLORS.black,
          borderBottomWidth: 1,
          height: 70,
        }}
        className="px-5 justify-between items-center flex-row"
      >
        <View className="flex-row items-center">
          <Text style={{ fontFamily: "epi-b", fontSize: 32, marginRight: 5 }}>
            Explorasi
          </Text>
          <MaterialIcons name="explore" size={35} />
        </View>
        <View className="flex-row gap-x-2 items-center">
          <Betacoin width={30} height={30} />
          <Text
            style={{
              fontFamily: "epi-b",
              fontSize: 24,
              marginRight: 5,
            }}
          >
            110
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: "hotpink" }} className="flex-[4]">
        <View
          style={{
            backgroundColor: "hotpink",
            justifyContent: "center",
            alignItems: "center",
            height: 70,
          }}
        >
          <View className="self-center items-center flex-row">
            <Text
              style={{
                fontFamily: "epi-r",
                fontSize: 24,
                color: COLORS.black,
              }}
            >
              Check-in
            </Text>
            <TouchableOpacity className="py-1 border px-2 mx-3 rounded-lg bg-white">
              <Ionicons name="camera" size={24} />
            </TouchableOpacity>
            <TouchableOpacity className="py-1 border px-2 rounded-lg bg-white">
              <MaterialCommunityIcons name="qrcode-scan" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          snapToInterval={450}
          decelerationRate="fast"
          contentContainerStyle={{
            height: SIZES.height * 2,
            backgroundColor: "hotpink",
            paddingTop: 5,
          }}
        >
          <View
            style={{
              backgroundColor: "hotpink",
              height: 20,
              justifyContent: "flex-end",
            }}
          >
            <View className="bg-white h-6 rounded-t-2xl border border-b-0" />
          </View>
          <View
            style={{
              backgroundColor: "white",
              height: 400,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{ fontFamily: "epi-r", fontSize: 20 }}
              className="text-center"
            >
              Jelajahi Tempat Beta dan menangkan Betacoins!
            </Text>

            <TouchableOpacity
              className="flex-grow-0 overflow-hidden"
              onPress={() => navigation.navigate("Map")}
            >
              <LinearGradient
                colors={["hotpink", COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-lg my-5 border px-2 py-2 flex-row self-center items-center"
              >
                <Text
                  style={{ fontFamily: "epi-b", fontSize: 14 }}
                  className="text-center mr-1"
                >
                  BetaMap
                </Text>
                <MaterialIcons name="map" size={20} />
              </LinearGradient>
            </TouchableOpacity>

            <Text style={{ fontFamily: "epi-r", fontSize: 16 }}>
              Kuliner Betawi
            </Text>
            <View className="flex-row my-3">
              <View className="p-6 bg-rose-400 rounded-lg"></View>
              <View className="p-6 bg-rose-400 rounded-lg ml-3"></View>
              <View className="p-6 bg-rose-400 rounded-lg ml-3"></View>
              <View className="p-6 bg-rose-400 rounded-lg ml-3"></View>
            </View>
            <Text style={{ fontFamily: "epi-r", fontSize: 16 }}>
              Area Berbudaya
            </Text>
            <View className="flex-row my-3">
              <View className="p-6 bg-sky-400 rounded-lg"></View>
              <View className="p-6 bg-sky-400 rounded-lg ml-3"></View>
              <View className="p-6 bg-sky-400 rounded-lg ml-3"></View>
            </View>
            <Text style={{ fontFamily: "epi-r", fontSize: 16 }}>Events</Text>
            <View className="flex-row my-3">
              <View className="p-6 bg-lime-400 rounded-lg"></View>
              <View className="p-6 bg-lime-400 rounded-lg ml-3"></View>
            </View>
          </View>
          <View className="bg-white h-6 rounded-b-2xl border border-t-0" />
          <View className="bg-white h-6 mt-5 rounded-t-2xl border border-b-0" />
          <View
            style={{
              backgroundColor: "white",
              borderLeftWidth: 1,
              borderRightWidth: 1,
              height: 800,
            }}
          >
            <Text
              style={{
                fontFamily: "epi-b",
                fontSize: 36,
                paddingHorizontal: 20,
                marginBottom: 20,
              }}
            >
              Market
            </Text>
            <View className="flex-row px-5 gap-x-3 justify-center mb-5">
              <View className="w-5/12 border h-64 rounded-xl relative bg-primary overflow-hidden">
                <View className="w-full h-44 border rounded-xl overflow-hidden">
                  <Image
                    className="object-fill w-full h-full"
                    source={require("../../assets/images/satusa_shoe.jpeg")}
                  />
                </View>

                <Text
                  style={{ fontFamily: "epi-b" }}
                  className=" text-lg mt-3 ml-3"
                >
                  Satusa Betawi Shoes
                </Text>
                <View className="absolute w-full h-full bg-black opacity-10" />
              </View>
              <TouchableOpacity
                onPress={() => setShowModal(true)}
                className="w-5/12 border h-64 rounded-xl relative bg-primary overflow-hidden"
              >
                <View className="w-full h-44 border rounded-xl overflow-hidden">
                  <Image
                    className="object-fill w-full h-full"
                    source={require("../../assets/images/pengantin_betawi_mug.jpeg")}
                  />
                </View>

                <Text
                  style={{ fontFamily: "epi-b" }}
                  className=" text-lg justify-center mt-3 ml-3"
                >
                  Pengantin Betawi Mug
                </Text>
                <View className="absolute w-full h-full bg-black opacity-10" />
              </TouchableOpacity>
            </View>
            <View className="flex-row px-5 gap-x-3 justify-center mb-5">
              <View className="w-5/12 border h-64 rounded-xl relative bg-primary overflow-hidden">
                <View className="w-full h-44 border rounded-xl overflow-hidden">
                  <Image
                    className="object-fill w-full h-full"
                    source={require("../../assets/images/betumpal_bowl.jpeg")}
                  />
                </View>

                <Text
                  style={{ fontFamily: "epi-b" }}
                  className=" text-lg mt-3 ml-3"
                >
                  Betumpal Bowl
                </Text>
                <View className="absolute w-full h-full bg-black opacity-10" />
              </View>
              <View className="w-5/12 border h-64 rounded-xl relative bg-primary overflow-hidden">
                <View className="w-full h-44 border rounded-xl overflow-hidden">
                  <Image
                    className="object-fill w-full h-full"
                    source={require("../../assets/images/ciliwung_plate.jpeg")}
                  />
                </View>

                <Text
                  style={{ fontFamily: "epi-b" }}
                  className=" text-lg justify-center mt-3 ml-3"
                >
                  Ciliwung Plate
                </Text>
                <View className="absolute w-full h-full bg-black opacity-10" />
              </View>
            </View>
            <View className="flex-row px-5 gap-x-3 justify-center mb-5">
              <View className="w-5/12 h-40 rounded-xl bg-gray-200"></View>
              <View className="w-5/12 h-40 rounded-xl bg-gray-200"></View>
            </View>
            <View className="flex-row px-5 gap-x-3 justify-center mb-5">
              <View className="w-5/12 h-40 rounded-xl bg-gray-200"></View>
              <View className="w-5/12 h-40 rounded-xl bg-gray-200"></View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;
