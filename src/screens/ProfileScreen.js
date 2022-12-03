import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeButton from "react-native-really-awesome-button-fixed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "Anek-EB";
  const lvlFont = "Anek-SXB";
  const gradientOptions = [
    ["#8A2387", "#E94057", "#F27121"],
    ["#ED213A", "#93291E"],
    ["#DA4453", "#89216B"],
  ];

  const [image, setImage] = useState(null);

  const pickGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickCamera = async () => {
    let perm = await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const avatarChangeAlert = () =>
    Alert.alert(
      "Ganti Foto Profil?",
      "Ayo tunjukan dirimu yang sebenarnya",
      [
        {
          text: "Nanti deh",
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
        {
          text: "Kamera",
          onPress: () => pickCamera(),
        },
        {
          text: "Galeri",
          onPress: () => pickGallery(),
        },
      ],
      { cancelable: true, onDismiss: () => console.log("gak jadi aku malu") }
    );
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        style={{ flex: 3 }}
        colors={gradientOptions[2]}
        className="rounded-t-2xl"
      >
        <View className="flex-1 pl-4">
          <TouchableOpacity
            onPress={avatarChangeAlert}
            className="rounded-full mt-10 mb-4 w-24 bg-white h-24 shadow-xl"
          >
            {image && (
              <Image
                source={{ uri: image }}
                className="object-fill rounded-full w-full h-full"
              />
            )}
          </TouchableOpacity>
          <Text style={{ fontFamily: "Anek-B" }} className="text-lg text-white">
            Ryan Tobing
          </Text>
          <View className="flex-row gap-x-1">
            <Fontisto name="flag" color={"#F9FAFB"} />
            <Text
              style={{ fontFamily: "Anek-B" }}
              className="text-sm text-gray-100"
            >
              Pemula
            </Text>
          </View>
          <View className="gap-y-1">
            <View className="flex-row gap-x-1 items-center">
              <FontAwesome5 name="map-marker-alt" color="#f3f4f6" />
              <Text className="text-xs text-inherit text-gray-100">
                Tangerang, Banten
              </Text>
            </View>

            <View className="flex-row gap-x-1 items-center">
              <FontAwesome5 name="door-open" color="#f3f4f6" />
              <Text className="text-xs text-inherit text-gray-100">
                2 Desember 2022
              </Text>
            </View>
          </View>
        </View>

        <View className="bottom-0 bg-white shadow-2xl w-full h-3 rounded-t-full absolute"></View>
      </LinearGradient>
      <View style={{ flex: 4 }} className="bg-white"></View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
