import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const BookScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "Anek-EB";
  const lvlFont = "Anek-SXB";
  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar style="auto" />
      <View className="h-15 flex-row items-center bg-slate-100">
        <Text
          style={{ fontFamily: lvlFont }}
          className="text-3xl pl-5 pr-3 pt-8"
        >
          Perpustakaan
        </Text>
        <Ionicons name="library" size={30} color="forestgreen" />
      </View>
      <View className="flex-1 bg-gray-50">
        <Text
          style={{ fontFamily: titleFont }}
          className="text-blue-800 text-2xl pl-5 pt-10"
        >
          Berita Betawi
        </Text>
        <ScrollView horizontal={true} className="flex-row px-5 pt-6 gap-x-3">
          <View className="bg-purple-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-orange-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-green-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-purple-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-orange-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-green-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-purple-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-orange-600 h-40 w-64 rounded-xl"></View>
          <View className="bg-green-600 h-40 w-64 rounded-xl"></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BookScreen;
