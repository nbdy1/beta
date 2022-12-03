import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import {
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Platform } from "expo-modules-core";
import { useEffect } from "react";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const MapScreen = ({ navigation }) => {
  // const [hasLocalPermission, setHasLocalPermission] = useState(false);
  // const [latitude, setLatitude] = useState(false);
  // const [longitude, setLongitude] = useState(false);
  // const [restaurantList, setRestaurantList] = useState(false);

  // useEffect(() => {
  //   getLocationAsync();
  // }, []);

  // async function getLocationAsync() {
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status === "granted") {
  //     let location = await Location.getCurrentPositionAsync({});
  //     setHasLocalPermission(true);
  //     setLatitude(location.coords.latitude);
  //     setLongitude(location.coords.longitude);
  //   } else {
  //     alert("Location permission not granted");
  //   }
  // }

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: "#fff",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  // });

  const handleRestaurantSearch = () => {
    const url =
      "https://maps.googleapis.com/maps/api/pzlace/nearbysearch/json?";
    const location = `location=${latitude.longitude}`;
    const radius = "&radius=3000";
    const type = "&keyword=restaurant";
    const key = "AIzaSyAZzsf6ZSvEYbaGx7klKcHtZet_IIG0Uls";
    const restaurantSearchUrl = url + location + radius + type + key;

    fetch(restaurantSearchUrl)
      .then((response) => response.json())
      .then((result) => setRestaurantList(result))
      .catch((e) => console.log(e));
  };

  const [text, setText] = useState("");
  const initialMapState = {
    categories: [
      {
        name: "Soto Betawi",
        icon: (
          <MaterialCommunityIcons
            name="bowl-mix-outline"
            color="gray"
            size={15}
          />
        ),
      },
      {
        name: "Kerak Telor",
        icon: <Ionicons name="egg-outline" color="gray" size={15} />,
      },
      {
        name: "Tempat Peninggalan",
        icon: <Fontisto name="holiday-village" color="gray" size={15} />,
      },
    ],
  };
  return (
    <>
      <MapView
        className="flex-1"
        initialRegion={{
          latitude: -6.2677,
          longitude: 156.737,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View className="absolute flex-1 flex-row top-8 bg-white justify-between items-center px-5 rounded-full self-center w-11/12">
        <TextInput
          className="h-16 w-11/12 text-base rounded-full bg-white"
          value={text}
          placeholder="Cari Restoran Betawi Terdekat?"
          onChangeText={(text) => setText(text)}
        />

        <Ionicons
          name="ios-search"
          className="px-3"
          color="gray"
          size={25}
        ></Ionicons>
      </View>

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        className="top-[105px] gap-x-3 pl-2 absolute"
        contentInset={{ top: 0, left: 20, bottom: 0, right: 20 }}
        contentContainerStyle={{
          paddingLeft: Platform.OS == "android" ? 15 : 0,
          paddingRight: Platform.OS == "android" ? 15 : 0,
        }}
      >
        {initialMapState.categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white px-3 items-center flex-row-reverse gap-x-2 rounded-full"
          >
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.container}>
        <FlatList
          data={restaurantList.results}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          style={{
            backgroundColor: "grey",
            width: "80%",
            margin: 60,
            padding: 5,
          }}
        />
        <TouchableOpacity onPress={() => handleRestaurantSearch()}>
          <Text
            style={{
              backgroundColor: "grey",
              color: "white",
              padding: 20,
              marginBottom: 50,
            }}
          >
            Search Restaurants
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </>
  );
};

export default MapScreen;
