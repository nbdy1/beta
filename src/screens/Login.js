import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { firebase } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.primary }}
      className="flex-1"
    >
      <StatusBar style="auto" />
      <View
        style={{ backgroundColor: COLORS.primary }}
        className="flex-1 justify-center items-center"
      >
        <Text
          style={{
            fontFamily: "righteous",
            fontSize: 32,
            color: COLORS.secondary,
          }}
        >
          BetawithYou
        </Text>
        <Text
          style={{
            fontFamily: "epi-b",
            fontSize: 24,
            color: COLORS.white,
          }}
          className="mt-5 mb-3"
        >
          Login Akun
        </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-9/12 rounded-md bg-white h-12 mb-2 pl-3"
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          className="w-9/12 rounded-md bg-white h-12 pl-3"
        />
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          className="bg-white rounded-full mt-7 px-5 py-2"
        >
          <Text
            style={{
              fontFamily: "epi-b",
              fontSize: 16,
              color: COLORS.secondary,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="mt-10"
          onPress={() => navigation.navigate("Registration")}
        >
          <Text
            style={{
              fontFamily: "epi-r",
              fontSize: 14,
              color: COLORS.white,
              textDecorationLine: "underline",
            }}
          >
            Belum punya akun? Register sekarang yuk
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
