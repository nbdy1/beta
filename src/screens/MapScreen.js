import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const MapScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <View className="bg-gray-50 flex-1 justify-center items-center">
        <Text>Map</Text>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;
