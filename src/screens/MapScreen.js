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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
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
  const GOOGLE_PLACES_API_KEY = "AIzaSyAZzsf6ZSvEYbaGx7klKcHtZet_IIG0Uls";

  const mapRef = useRef(null);
  const queryRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: -6.2677403,
    longitude: 106.7370338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [destination, setDestination] = useState({
    latitude: -8.2677403,
    longitude: 108.7370338,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [searched, setSearched] = useState(false);

  const goToMarker = () => {
    mapRef.current.animateToRegion(
      {
        latitude: searched.location.lat,
        longitude: searched.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1 * 1000
    );
  };

  return (
    <>
      <MapView
        initialRegion={region}
        ref={mapRef}
        onRegionChangeComplete={(region) => setRegion(region)}
        region={region}
        className="flex-1"
      >
        {/* <Marker coordinate={KosGw} /> */}
        {searched && (
          <Marker
            coordinate={{
              latitude: searched.location.lat,
              longitude: searched.location.lng,
            }}
            title={"Searched"}
            description={searched.description}
            identifier="searched"
          />
        )}
        {location != null && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
      </MapView>
      <View className="absolute z-50 items-center gap-x-2 flex-1 flex-row w-11/12 self-center top-8">
        <GooglePlacesAutocomplete
          ref={queryRef}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
            components: "country:id",
          }}
          returnKeyType={"default"}
          fetchDetails={true}
          debounce={400}
          onPress={(data, details = null) =>
            setSearched({
              location: details.geometry.location,
              description: data.description,
            })
          }
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
        <TouchableOpacity onPress={() => queryRef.current?.clear()}>
          <Fontisto name="close-a" size={20} color={"gray"} />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-24 self-center">
        <TouchableOpacity
          className="bg-blue-500 w-32 self-center text-center rounded-full mb-2"
          onPress={() => goToMarker()}
        >
          <Text className="text-center text-lg text-white p-2">
            Go To Marker
          </Text>
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

// TODO: Map through result array and retrieve the restaurants's location (and probably place_id buat further details with place details api)

// { lat, lng } = results[i].geometry.location.lat, results[i].geometry.location.lng

export default MapScreen;
