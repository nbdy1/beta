import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
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
import { COLORS } from "../constants";
import { Avatar, Badge, TouchableRipple } from "react-native-paper";
import RankSvg from "../components/RankSvg";
import { ScrollView } from "react-native-gesture-handler";
import { lte } from "lodash";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
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
          console.log(`snapshot data is ${JSON.stringify(snapshot.data())}`);
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
    let user = firebase.auth().currentUser;
    let dateObject = new Date(user.metadata.creationTime);
    let signupDate = dateObject.toLocaleDateString("id-ID", {
      dateStyle: "short",
    });
    console.log(signupDate);
    setDate(signupDate);
  }, []);

  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-b";
  const lvlFont = "epi-r";
  const gradientOptions = [
    ["#8A2387", "#E93557", "#F27121"],
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
    <SafeAreaView
      style={{ backgroundColor: COLORS.primary }}
      className="flex-1"
    >
      <View
        style={{
          backgroundColor: "#FFFFFF",
          borderBottomColor: COLORS.divider,
          borderBottomWidth: 2,
        }}
        className="flex-1 items-center flex-row px-5"
      >
        <View
          style={{ justifyContent: "center", alignItems: "center" }}
          className="rounded-full relative"
        >
          <TouchableOpacity onPress={avatarChangeAlert}>
            <Avatar.Image
              size={100}
              source={
                image
                  ? require("../../assets/images/default_avatar.jpg")
                  : require("../../assets/images/default_avatar.jpg")
              }
            ></Avatar.Image>
            {/* {image && (
              <>
                <Avatar.Image
                
                  size={100}
                  source={{ uri: image.uri }}
                ></Avatar.Image>
              </>
            )} */}
          </TouchableOpacity>
          <Badge
            style={{
              borderRadius: 6,
              fontFamily: "epi-b",
              left: "27%",
              right: "27%",
              bottom: -10,
            }}
            className="absolute bg-secondary"
          >
            Lvl 25
          </Badge>
        </View>
        <View className="px-5">
          <Text style={{ fontFamily: "epi-b", fontSize: 16 }}>
            {name ? `${name.firstName} ${name.lastName}` : "User"}
          </Text>
          <Text style={{ fontFamily: "epi-m", fontSize: 12 }}>
            Tangerang, Banten
          </Text>
          <Text style={{ fontFamily: "epi-m", fontSize: 12 }}>{date}</Text>
        </View>
      </View>
      {/* <LinearGradient
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
      </LinearGradient> */}
      <View className="flex-[4]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={{ paddingBottom: 70 }}
          className="bg-white px-5"
        >
          <View>
            <Text
              style={{
                fontFamily: "epi-b",
                fontSize: 20,
                marginTop: 35,
                marginBottom: 10,
              }}
            >
              Statistik
            </Text>
            <View style={styles.roundedContainer} className="justify-center">
              <View className="items-center pt-2 w-1/3">
                <Text
                  style={{
                    fontFamily: "epi-b",
                    fontSize: 10,
                    marginBottom: 10,
                  }}
                >
                  Streak Terpanjang
                </Text>
                <View className="items-center">
                  <FontAwesome5 name={"fire"} color="orange" size={35} />
                  <Text
                    style={{
                      fontFamily: "epi-bl",
                      marginTop: -17,
                      fontSize: 25,
                      color: "#e86b0d",
                    }}
                  >
                    20
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderColor: COLORS.divider,
                  borderLeftWidth: 2,
                  borderRightWidth: 2,
                }}
                className="items-center pt-2 w-1/3"
              >
                <Text
                  style={{
                    fontFamily: "epi-b",
                    fontSize: 10,
                    marginBottom: 10,
                  }}
                >
                  Rank Tertinggi
                </Text>
                <RankSvg name={"Diamond"} height={60} width={60} />
              </View>
              <View className="items-center pt-2 w-1/3">
                <Text
                  style={{
                    fontFamily: "epi-b",
                    fontSize: 10,
                    marginBottom: 10,
                  }}
                >
                  Rank Sekarang
                </Text>
                <RankSvg name={"Emerald"} height={60} width={60} />
              </View>
            </View>
            <Text
              style={{
                fontFamily: "epi-b",
                fontSize: 20,
                marginTop: 35,
                marginBottom: 10,
              }}
            >
              Medali
            </Text>
            <View style={styles.roundedContainer}></View>
            <Text
              style={{
                fontFamily: "epi-b",
                fontSize: 20,
                marginTop: 35,
                marginBottom: 10,
              }}
            >
              Teman
            </Text>
          </View>

          <View style={styles.BigContainer}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roundedContainer: {
    height: 110,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: COLORS.divider,
    borderWidth: 2,
    borderRadius: 15,
  },
  BigContainer: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: COLORS.divider,
    borderWidth: 2,
    borderRadius: 15,
  },
});
export default ProfileScreen;
