import * as React from "react";
import { Text, View } from "react-native";
import HomeScreen from "./HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfileScreen from "./ProfileScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import RewardsScreen from "./RewardsScreen";
import BookScreen from "./BookScreen";
import MapScreen from "./MapScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      labeled={false}
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="whitesmoke"
      barStyle={{
        position: "absolute",
        bottom: 0,
        borderTopStartRadius: 5,
        borderTopEndRadius: 5,
        backgroundColor: "#EF4444",
        paddingTop: 5,
        paddingBottom: 5,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 25;

          if (route.name === "Rewards") {
            iconName = focused ? "medal" : "medal-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Book") {
            iconName = focused ? "book" : "book-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Map") {
            iconName = focused
              ? "map-marker-radius"
              : "map-marker-radius-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "whitesmoke",
        tabBarInactiveTintColor: "whitesmoke",
      })}
    >
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Book"
        component={BookScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
