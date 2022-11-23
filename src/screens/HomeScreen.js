import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StageScreen from "./StageScreen";
import { useLayoutEffect } from "react";

const Stack = createNativeStackNavigator();

const StageMenuScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView className="flex-1">
        <StatusBar style="auto" />
        <View className="bg-gray-50 flex-1">
          <View className="bg-red-500 h-14 flex-row w-full justify-end items-center px-3">
            <FontAwesome5 name="coins" size={24} color="white" />
            <Text className="text-gray-50 ml-3 text-2xl font-bold">355</Text>
          </View>
          <View className="px-7">
            <Text className="text-3xl font-bold py-10 mb-10">
              Bab 1 - Permulaan
            </Text>
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor="#EF4444"
              backgroundDarker="#DC2626"
              onPress={() => navigation.navigate("Home", { screen: "Stage" })}
            >
              Level 1
            </AwesomeButton>
            <View className="mt-14">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor="#EF4444"
                backgroundDarker="#DC2626"
                style={{
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                Level 2
              </AwesomeButton>
            </View>
            <View className="mt-14">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor="#EF4444"
                backgroundDarker="#DC2626"
              >
                Level 3
              </AwesomeButton>
            </View>
            <View className="mt-14">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor="#EF4444"
                backgroundDarker="#DC2626"
              >
                Level 4
              </AwesomeButton>
            </View>
            <View className="mt-14">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor="#EF4444"
                backgroundDarker="#DC2626"
              >
                Level 5
              </AwesomeButton>
            </View>
            <View className="mt-14">
              <AwesomeButton
                stretch={true}
                height={40}
                borderRadius={50}
                backgroundColor="#EF4444"
                backgroundDarker="#DC2626"
              >
                Level 6
              </AwesomeButton>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="StageMenu"
    //     component={StageMenuScreen}
    //     options={{ headerShown: false, tabBarStyle: { display: "none" } }}
    //   />
    //   <Stack.Screen
    //     name="Stage"
    //     component={StageScreen}
    //     options={{
    //       headerShown: false,
    //       tabBarStyle: { display: "none" },
    //     }}
    //   />
    // </Stack.Navigator>
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <View className="bg-gray-50 flex-1">
        <View className="bg-red-500 h-14 flex-row w-full justify-end items-center px-3">
          <FontAwesome5 name="coins" size={24} color="white" />
          <Text className="text-gray-50 ml-3 text-2xl font-bold">355</Text>
        </View>
        <View className="px-7">
          <Text className="text-3xl font-bold py-10 mb-10">
            Bab 1 - Permulaan
          </Text>
          <AwesomeButton
            stretch={true}
            height={40}
            borderRadius={50}
            backgroundColor="#EF4444"
            backgroundDarker="#DC2626"
            onPress={() => navigation.navigate("NoTabs")}
          >
            Level 1
          </AwesomeButton>
          <View className="mt-14">
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor="#EF4444"
              backgroundDarker="#DC2626"
              style={{
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              Level 2
            </AwesomeButton>
          </View>
          <View className="mt-14">
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor="#EF4444"
              backgroundDarker="#DC2626"
            >
              Level 3
            </AwesomeButton>
          </View>
          <View className="mt-14">
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor="#EF4444"
              backgroundDarker="#DC2626"
            >
              Level 4
            </AwesomeButton>
          </View>
          <View className="mt-14">
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor="#EF4444"
              backgroundDarker="#DC2626"
            >
              Level 5
            </AwesomeButton>
          </View>
          <View className="mt-14">
            <AwesomeButton
              stretch={true}
              height={40}
              borderRadius={50}
              backgroundColor="#EF4444"
              backgroundDarker="#DC2626"
            >
              Level 6
            </AwesomeButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
