import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { firebase } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/theme";
import { Path, Svg } from "react-native-svg";
import { IconButton } from "react-native-paper";

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const levelProgress = {
    chapter: 1,
    stage: 1,
    substage: 1,
  };
  const currency = {
    betacoins: 0,
    xp: 0,
  };

  const registerUser = async (email, password, firstName, lastName) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://betawith-you.firebaseapp.com",
          })
          .then(() => {
            alert("Email verifikasi terkirim");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName: firstName,
                lastName: lastName,
                email: email,
                levelProgress: levelProgress,
                currency: currency,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <StatusBar style="auto" />

      <View className="flex-1 justify-center items-center bg-white">
        <Svg
          viewBox="0 0 1440 320"
          width={"100%"}
          height={"10%"}
          style={{ position: "absolute", top: 0 }}
          preserveAspectRatio="none"
        >
          <Path
            stroke={COLORS.black}
            strokeWidth={5}
            d="M0,256L34.3,234.7C68.6,213,137,171,206,165.3C274.3,160,343,192,411,192C480,192,549,160,617,138.7C685.7,117,754,107,823,122.7C891.4,139,960,181,1029,197.3C1097.1,213,1166,203,1234,213.3C1302.9,224,1371,256,1406,272L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
            fill={COLORS.secondary}
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
            d="M0,256L34.3,234.7C68.6,213,137,171,206,165.3C274.3,160,343,192,411,192C480,192,549,160,617,138.7C685.7,117,754,107,823,122.7C891.4,139,960,181,1029,197.3C1097.1,213,1166,203,1234,213.3C1302.9,224,1371,256,1406,272L1440,288L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
            fill={COLORS.secondary}
          />
        </Svg>
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <IconButton
            icon={"arrow-left"}
            color={"black"}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          style={{
            fontFamily: "epi-b",
            color: COLORS.black,
            fontSize: 24,
            padding: 0,
            borderRadius: 10,
          }}
          className="mb-6"
        >
          Daftar Akun
        </Text>
        <TextInput
          style={{ fontFamily: "epi-r" }}
          placeholder="Nama Depan"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-10/12 rounded-md bg-slate-50 border h-12 mb-4 pl-3"
        />
        <TextInput
          style={{ fontFamily: "epi-r" }}
          placeholder="Nama Belakang"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-10/12 rounded-md bg-slate-50 border h-12 mb-4 pl-3"
        />
        <TextInput
          style={{ fontFamily: "epi-r" }}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-10/12 rounded-md bg-slate-50 border h-12 mb-4 pl-3"
        />
        <TextInput
          style={{ fontFamily: "epi-r" }}
          placeholder="Kata Sandi"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          className="w-10/12 rounded-md bg-slate-50 border h-12 mb-4 pl-3"
        />
        <TextInput
          style={{ fontFamily: "epi-r" }}
          placeholder="Konfirmasi Kata Sandi"
          onChangeText={(password) => setConfirmPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          className="w-10/12 rounded-md bg-slate-50 border h-12 mb-4 pl-3"
        />

        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          disabled={
            email && password && confirmPassword && firstName && lastName
              ? false
              : true
          }
        >
          <View
            className={`py-2 border rounded-lg mt-5 px-5 ${
              email && password && confirmPassword && firstName && lastName
                ? "border"
                : "border-gray-400"
            }`}
          >
            <Text
              onPress={() => registerUser(email, password, firstName, lastName)}
              className={
                email && password && confirmPassword && firstName && lastName
                  ? "text-black"
                  : "text-gray-400"
              }
              style={{ fontFamily: "epi-b", fontSize: 16 }}
            >
              Daftar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Registration;
