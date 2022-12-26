import React, { useState, useEffect, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabNavigator from "./src/screens/TabNavigator";
import StageScreen from "./src/screens/StageScreen";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import Login from "./src/screens/Login";
import Registration from "./src/screens/Registration";
import { firebase } from "./firebaseConfig";
import { ContextProvider } from "./src/constants/noCycle";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    "Anek-R": require("./assets/fonts/AnekTelugu-Regular.ttf"),
    "Anek-B": require("./assets/fonts/AnekTelugu-Bold.ttf"),
    "Anek-EB": require("./assets/fonts/AnekTelugu-ExtraBold.ttf"),
    "Anek-EXB": require("./assets/fonts/AnekTelugu_Expanded-Bold.ttf"),
    "Anek-SXB": require("./assets/fonts/AnekTelugu_SemiExpanded-Bold.ttf"),
    // "Anek-CM": require("../../assets/fonts/AnekTelugu_Condensed-Medium.ttf"),
    // "Anek-SCB": require("../../assets/fonts/AnekTelugu_SemiCondensed-Bold.ttf"),
  });

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    return subscriber;
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tabs">
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
    </ContextProvider>
  );
}
