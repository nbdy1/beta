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
import MapView, { Marker } from "react-native-maps";
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
import { useRef } from "react";

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

  // const handleRestaurantSearch = () => {
  //   const url =
  //     "https://maps.googleapis.com/maps/api/pzlace/nearbysearch/json?";
  //   const location = `location=${latitude.longitude}`;
  //   const radius = "&radius=3000";
  //   const type = "&keyword=restaurant";
  //   const key = "AIzaSyAZzsf6ZSvEYbaGx7klKcHtZet_IIG0Uls";
  //   const restaurantSearchUrl = url + location + radius + type + key;

  //   fetch(restaurantSearchUrl)
  //     .then((response) => response.json())
  //     .then((result) => setRestaurantList(result))
  //     .catch((e) => console.log(e));
  // };

  const GOOGLE_PLACES_API_KEY = "AIzaSyAZzsf6ZSvEYbaGx7klKcHtZet_IIG0Uls";

  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: -6.2677403,
    longitude: 106.7370338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const KosGw = {
    latitude: -6.2677403,
    longitude: 106.7370338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const goToKos = () => {
    //Animate the user to new region. Complete this animation in 3 seconds
    mapRef.current.animateToRegion(KosGw, 1 * 1000);
  };

  // const initialMapState = {
  //   categories: [
  //     {
  //       name: "Soto Betawi",
  //       icon: (
  //         <MaterialCommunityIcons
  //           name="bowl-mix-outline"
  //           color="gray"
  //           size={15}
  //         />
  //       ),
  //     },
  //     {
  //       name: "Kerak Telor",
  //       icon: <Ionicons name="egg-outline" color="gray" size={15} />,
  //     },
  //     {
  //       name: "Tempat Peninggalan",
  //       icon: <Fontisto name="holiday-village" color="gray" size={15} />,
  //     },
  //   ],
  // };

  return (
    <>
      <MapView
        ref={mapRef}
        onRegionChangeComplete={(region) => setRegion(region)}
        region={region}
        className="flex-1"
      >
        <Marker coordinate={KosGw} />
      </MapView>
      <View className="absolute z-50 flex-1 flex-row w-11/12 self-center top-8">
        {/* <TextInput
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
        ></Ionicons> */}
        <GooglePlacesAutocomplete
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
            components: "country:id",
          }}
          GooglePlacesSearchQuery={{
            type: "restaurant",
            location: `${region.latitude},${region.longitude}`,
            radius: "10000",
          }}
          returnKeyType={"default"}
          fetchDetails={true}
          onPress={(data, details = null) => console.log(data, details)}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          listEmptyComponent={() => (
            <View className="flex-1 bg-white p-2">
              <Text>Tidak ada hasil yang ditemukan </Text>
            </View>
          )}
          textInputProps={{
            InputComp: TextInput,
            placeholder: "Cari Restoran Soto Betawi?",
          }}
        />
      </View>
      <View className="absolute bottom-24 self-center">
        <TouchableOpacity
          className="bg-blue-500 w-32 self-center text-center rounded-full mb-2"
          onPress={() => goToKos()}
        >
          <Text className="text-center text-lg text-white p-2">Go To Kos</Text>
        </TouchableOpacity>
        <View className="bg-white rounded-full opacity-50">
          <Text className="text-xl p-2 text-black">{`${region.latitude}, ${region.longitude}`}</Text>
        </View>
      </View>

      {/* <ScrollView
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
      </ScrollView> */}
      {/* <View style={styles.container}>
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
        <TouchableOpacity onPress={() => console.log("Test")}>
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
      </View> */}
    </>
  );
};

export default MapScreen;
