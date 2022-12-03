import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfileScreen from "./src/screens/ProfileScreen";
import StageScreen from "./src/screens/StageScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RewardsScreen from "./src/screens/RewardsScreen";
import BookScreen from "./src/screens/BookScreen";
import MapScreen from "./src/screens/MapScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import TabNavigator from "./src/screens/TabNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NoTabs"
            component={StageScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>

    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={HomeScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Profile"
    //       component={ProfileScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Stage"
    //       component={StageScreen}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
