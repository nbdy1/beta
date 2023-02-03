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
import { COLORS, SIZES } from "../constants/theme";
import Svg, { Path } from "react-native-svg";
import { Circle } from "react-native-maps";

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
      {/* <View style={{ width: "100%", position: "absolute" }}>
        <View
          style={{
            backgroundColor: "#5000ca",
            height: 200,
          }}
        >
          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: "absolute", top: 0 }}
          >
            <Path
              fill="#5000ca"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </Svg>
        </View>
      </View> */}

      <View
        style={{ backgroundColor: "#fff" }}
        className="flex-1 justify-center items-center"
      >
        <Svg
          className="border"
          viewBox="0 0 1440 320"
          width={"100%"}
          height={"10%"}
          style={{ position: "absolute", top: 0 }}
          preserveAspectRatio="none"
        >
          <Path
            stroke={COLORS.black}
            strokeWidth={5}
            // d="M0,128L40,154.7C80,181,160,235,240,250.7C320,267,400,245,480,224C560,203,640,181,720,192C800,203,880,245,960,272C1040,299,1120,309,1200,282.7C1280,256,1360,192,1400,160L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            d="M0,64L40,80C80,96,160,128,240,160C320,192,400,224,480,218.7C560,213,640,171,720,165.3C800,160,880,192,960,213.3C1040,235,1120,245,1200,224C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            fill={COLORS.primary}
          />
        </Svg>
        <Svg
          viewBox="0 0 1440 320"
          width={"100%"}
          height={"10%"}
          style={{ position: "absolute", bottom: 0 }}
          preserveAspectRatio="none"
        >
          <Path
            stroke={COLORS.black}
            strokeWidth={5}
            d="M0,64L40,80C80,96,160,128,240,160C320,192,400,224,480,218.7C560,213,640,171,720,165.3C800,160,880,192,960,213.3C1040,235,1120,245,1200,224C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            fill={COLORS.primary}
          />
        </Svg>
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
            fontSize: 20,
            color: "gray",
          }}
          className="mt-5 mb-3"
        >
          Login akun ente sini
        </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ fontFamily: "epi-r" }}
          className="w-9/12 rounded-md bg-white border h-12 mb-2 pl-3"
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          style={{ fontFamily: "epi-r" }}
          className="w-9/12 rounded-md bg-white border h-12 pl-3"
        />
        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          className="bg-primary rounded-lg border mt-7 px-5 py-2"
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
              color: COLORS.black,
              textDecorationLine: "underline",
            }}
          >
            Belum punya akun? Daftar sekarang yuk →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
