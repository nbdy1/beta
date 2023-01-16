import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { firebase } from "../../firebaseConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    levelProgress: {
      chapter: 1,
      stage: 1,
      substage: 1,
    },
    currency: {
      betacoins: 0,
      xp: 0,
    },
  };

  registerUser = async (email, password, firstName, lastName) => {
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
              .set(data);
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
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <View className="flex-1 justify-center items-center bg-white">
        <Text
          style={{
            fontFamily: "epi-bl",
            fontSize: 26,
            borderBottomWidth: 1,
            padding: 0,
            borderRadius: 10,
            borderBottomColor: "#ef4444",
          }}
          className="mt-5 mb-10"
        >
          Registrasi Akun
        </Text>
        <TextInput
          placeholder="Nama Depan"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-10/12 rounded-md bg-red-100 h-12 mb-4 pl-3"
        />
        <TextInput
          placeholder="Nama Belakang"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-10/12 rounded-md bg-red-100 h-12 mb-4 pl-3"
        />
        <TextInput
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          className="w-10/12 rounded-md bg-red-100 h-12 mb-4 pl-3"
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          className="w-10/12 rounded-md bg-red-100 h-12 mb-4 pl-3"
        />

        <TouchableOpacity
          onPress={() => loginUser(email, password)}
          className="bg-red-500 shadow-xl rounded-full mt-5 px-5  shadow-red-500"
        >
          <Text
            onPress={() => registerUser(email, password, firstName, lastName)}
            className="text-white"
            style={{ fontFamily: "epi-b", fontSize: 16 }}
          >
            Buat Akun
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Registration;
