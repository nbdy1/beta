import React, { useEffect, useState } from "react";
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
import { firebase } from "../../firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState(false);
  const [uploading, setUploading] = useState(false);
  const storage = getStorage();
  const [imageName, setImageName] = useState(0);
  const [imageRef, setImageRef] = useState("");

  useEffect(() => {
    if (uploading == false && image == null) {
      async () =>
        await ref(storage, imageName)
          .getDownloadURL()
          .then((url) => {
            setImageRef(url);
            console.log(`imageRef is ${url}`);
          })
          .catch((e) =>
            console.log("getting downloadURL of image error => ", e)
          );
    }
  }, [uploading]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []);

  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-b";
  const lvlFont = "epi-r";
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

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);

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

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
    console.log(source);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (image != null) {
      console.log("We tried!");
      uploadImage();
    }
  }, [image]);

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    console.log(`response is ${response}`);
    const blob = await response.blob();
    console.log(`blob is ${blob}`);
    setImageName((name) => name + 1);
    console.log(`imageName is ${imageName}`);
    storageRef = ref(storage, `${imageName}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log(`snapshot is ${snapshot}`);
      console.log("Image uploaded.");
    });
    setUploading(false);
    Alert.alert("Photo changed and uploaded to database...");
    setImage(null);
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
        <View className="flex-1 relative pl-4">
          <TouchableOpacity
            onPress={() => {
              firebase.auth().signOut();
            }}
            className="absolute top-8 px-2 py-2 right-5 rounded-full bg-white"
          >
            <Ionicons name="log-out" size={30} color="#ef4444" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={avatarChangeAlert}
            className="rounded-full mt-10 mb-4 w-24 bg-white h-24 shadow-xl"
          >
            {image && (
              <Image
                source={{ uri: image.uri }}
                className="object-fill rounded-full w-full h-full"
              />
            )}
          </TouchableOpacity>
          <Text style={{ fontFamily: "epi-b" }} className="text-lg text-white">
            {name.firstName} {name.lastName}
          </Text>
          <View className="flex-row gap-x-1">
            <Fontisto name="flag" color={"#F9FAFB"} />
            <Text
              style={{ fontFamily: "epi-b" }}
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
