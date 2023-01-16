import React, { useMemo, useState, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import {
  Feather,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Platform } from "expo-modules-core";
import { useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef } from "react";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { COLORS } from "../constants/theme";
import * as SplashScreen from "expo-splash-screen";
import StarRating from "../components/StageButton.js/StarRating";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { SIZES } from "../constants/theme";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 250;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const BOTTOMSHEET_TITLE = SIZES.height * SIZES.base * 0.003;
const BOTTOMSHEET_DESCRIPTION = SIZES.height * SIZES.base * 0.0025;
const BUTTON_TEXT = SIZES.height * SIZES.base * 0.0025;

const MapScreen = ({ navigation }) => {
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const [nearbyData, setNearbyData] = useState(false);

  useEffect(() => {
    if (!nearbyData) return;

    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= nearbyData.results.length) {
        index = nearbyData.results.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const latitude = nearbyData.results[index].geometry.location.lat;
          const longitude = nearbyData.results[index].geometry.location.lng;
          mapRef.current.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.065,
              longitudeDelta: 0.065,
            },
            350
          );
        }
      }, 10);
    });
  }, [nearbyData]);

  const interpolations =
    nearbyData &&
    nearbyData.results.map((result, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];

      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });

      return { scale };
    });

  const mapStyle = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    scrollRef.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const [location, setLocation] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let getPos = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: getPos.coords.latitude,
        longitude: getPos.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      SplashScreen.hideAsync();
    })();
  }, []);

  const nearbySearchShortcuts = {
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
        keyword: "soto%20betawi",
      },
      {
        name: "Nasi Uduk",
        icon: <MaterialIcons name="rice-bowl" color="gray" size={15} />,
        keyword: "nasi%20uduk",
      },
      {
        name: "Ketoprak",
        icon: (
          <MaterialCommunityIcons
            name="food-takeout-box-outline"
            color="gray"
            size={15}
          />
        ),
        keyword: "ketoprak",
      },
    ],
  };
  const GOOGLE_PLACES_API_KEY = "AIzaSyCyeDateDsBDejZGNVX3B5IxYHD7a7WLEg";

  const mapRef = useRef(null);
  const scrollRef = useRef(null);
  const queryRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: -6.2,
    longitude: 106.816666,
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
        latitude: searched.geometry.location.lat,
        longitude: searched.geometry.location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1.5 * 1000
    );
  };

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const snapPoints = useMemo(() => ["75%", "50%"], []);

  const renderHeader = () => (
    <View className="bg-yellow-300 border-b-2 border-slate-50 w-full h-auto py-2 items-center rounded-t-lg">
      <View className="w-16 h-2 rounded-full bg-yellow-400"></View>
    </View>
  );

  // const renderContent = () => (
  //   <ScrollView className="bg-white p-5 pb-20 h-full">
  //     <Text
  //       style={{
  //         fontSize: BOTTOMSHEET_TITLE,
  //         fontFamily: "Anek-B",
  //       }}
  //     >
  //       {searched.name}
  //     </Text>
  //     <StarRating
  //       ratings={searched?.rating}
  //       reviews={searched?.user_ratings_total}
  //     />
  //     {searched.photos ? (
  //       <View className="py-4 my-4 h-48 border-slate-100 border-y-2">
  //         <Image
  //           className="h-full rounded-xl overflow-hidden"
  //           source={{
  //             uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${searched.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`,
  //           }}
  //           resizeMode={"cover"}
  //         />
  //       </View>
  //     ) : (
  //       <View className="my-4 h-40 border-y-2 border-slate-100">
  //         <Image
  //           className="h-full rounded-xl overflow-hidden my-5"
  //           source={require("../../assets/images/no_image.png")}
  //           resizeMode={"cover"}
  //         />
  //       </View>
  //     )}
  //     <ScrollView
  //       horizontal
  //       scrollEventThrottle={1}
  //       showsHorizontalScrollIndicator={false}
  //       height={40}
  //       className="gap-x-3 pl-2"
  //     >
  //       <TouchableOpacity className="bg-green-500 border-2 justify-center border-green-500 px-3 py-1 items-center flex-row-reverse gap-x-2 rounded-full">
  //         <Ionicons name="navigate" color={"#fff"} size={BUTTON_TEXT} />
  //         <Text
  //           style={{
  //             fontFamily: "Anek-B",
  //             color: "white",
  //             fontSize: BUTTON_TEXT,
  //           }}
  //         >
  //           Mulai
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity className="bg-white border-2 justify-center border-slate-100 px-3 py-1 items-center flex-row-reverse gap-x-2 rounded-full">
  //         <Ionicons name="navigate" size={BUTTON_TEXT} />
  //         <Text
  //           style={{
  //             fontFamily: "Anek-B",
  //             color: "white",
  //             fontSize: BUTTON_TEXT,
  //           }}
  //         >
  //           Telepon
  //         </Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity className="bg-white border-2 justify-center border-slate-100 px-3 py-1 items-center flex-row-reverse gap-x-2 rounded-full">
  //         <Ionicons name="navigate" size={BUTTON_TEXT} />
  //         <Text
  //           style={{
  //             fontFamily: "Anek-B",
  //             color: "white",
  //             fontSize: BUTTON_TEXT,
  //           }}
  //         >
  //           Bagikan
  //         </Text>
  //       </TouchableOpacity>
  //     </ScrollView>
  //     {searched.reviews && (
  //       <>
  //         <Text
  //           style={{
  //             fontSize: BOTTOMSHEET_TITLE,
  //             fontFamily: "Anek-B",
  //             marginBottom: 10,
  //           }}
  //         >
  //           Ulasan
  //         </Text>
  //         {searched.reviews.map((review, index) => {
  //           return (
  //             <View className="flex-row my-3" key={index}>
  //               <View className="flex-1">
  //                 <Image
  //                   className="h-full"
  //                   resizeMode={"cover"}
  //                   source={{ uri: review.profile_photo_url }}
  //                 />
  //               </View>
  //               <View className="flex-4">
  //                 <Text numberOfLines={4}>{review.text}</Text>
  //                 <Text>
  //                   {review.author_name} · {review.relative_time_description}{" "}
  //                 </Text>
  //               </View>
  //             </View>
  //           );
  //         })}
  //       </>
  //     )}
  //   </ScrollView>
  // );

  useEffect(() => {
    if (!location || !searched) return;

    mapRef.current.fitToCoordinates(
      [
        {
          latitude: searched.geometry.location.lat,
          longitude: searched.geometry.location.lng,
        },
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      ],
      {
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 200,
          left: 50,
        },
      }
    );
    console.log(searched.full);
    // bottomSheetRef.current.snapTo(0);
  }, [location, searched]);
  return (
    <>
      {location && (
        <MapView
          customMapStyle={mapStyle}
          initialRegion={location}
          ref={mapRef}
          className="flex-1"
        >
          {searched && (
            <MapViewDirections
              apikey="AIzaSyCyeDateDsBDejZGNVX3B5IxYHD7a7WLEg"
              strokeWidth={5}
              strokeColor={COLORS.secondary}
              origin={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              destination={{
                latitude: searched.geometry.location.lat,
                longitude: searched.geometry.location.lng,
              }}
            />
          )}

          {nearbyData &&
            nearbyData.results.map((result, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                  }}
                  title={result.name}
                  onPress={(e) => onMarkerPress(e)}
                  description={result.vicinity}
                  identifier={`nd-${index}`}
                  icon={require("../../assets/markers/food.png")}
                />
              );
            })}
          {searched && (
            <>
              <Marker
                coordinate={{
                  latitude: searched.geometry.location.lat,
                  longitude: searched.geometry.location.lng,
                }}
                title={searched.name}
                description={searched.vicinity}
                identifier="searched"
                icon={require("../../assets/markers/food.png")}
              ></Marker>
            </>
          )}
          {location && (
            <Marker
              title={"Kamu"}
              identifier={"origin"}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              image={require("../../assets/markers/you.png")}
            />
          )}
        </MapView>
      )}
      {searched && (
        <BottomSheet
          enableHandlePanningGesture={true}
          ref={bottomSheetRef}
          index={0}
          snapPoints={[200, 500, 300]}
          onChange={handleSheetChanges}
        >
          <BottomSheetScrollView
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: BOTTOMSHEET_TITLE,
                fontFamily: "epi-b",
              }}
            >
              {searched.name}
            </Text>
            <StarRating
              ratings={searched?.rating}
              reviews={searched?.user_ratings_total}
            />
            {searched.photos ? (
              <View className="py-4 my-4 h-48 border-slate-100 border-y-2">
                <Image
                  className="h-full rounded-xl overflow-hidden"
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${searched.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`,
                  }}
                  resizeMode={"cover"}
                />
              </View>
            ) : (
              <View className="my-4 h-40 border-y-2 border-slate-100">
                <Image
                  className="h-full rounded-xl overflow-hidden my-5"
                  source={require("../../assets/images/no_image.png")}
                  resizeMode={"cover"}
                />
              </View>
            )}
            <BottomSheetScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity className="bg-green-500 border-2 justify-center border-green-500 px-3 pr-3 items-center flex-row-reverse gap-x-2 rounded-full">
                <Ionicons name="navigate" color={"#fff"} size={BUTTON_TEXT} />
                <Text
                  style={{
                    fontFamily: "epi-r",
                    color: "white",
                    fontSize: BUTTON_TEXT,
                  }}
                >
                  Mulai
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border-2 border-slate-100 px-3 my-0 items-center flex-row-reverse gap-x-2 rounded-full">
                <Ionicons name="navigate" size={BUTTON_TEXT} />
                <Text style={{ fontFamily: "epi-r", fontSize: BUTTON_TEXT }}>
                  Telepon
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border-2 border-slate-100 px-3 my-0 items-center flex-row-reverse gap-x-2 rounded-full">
                <Ionicons name="navigate" size={BUTTON_TEXT} />
                <Text style={{ fontFamily: "epi-r", fontSize: BUTTON_TEXT }}>
                  Bagikan
                </Text>
              </TouchableOpacity>
            </BottomSheetScrollView>
            {searched.reviews && (
              <>
                <Text
                  style={{
                    fontSize: BOTTOMSHEET_TITLE,
                    fontFamily: "epi-b",
                    marginBottom: 10,
                  }}
                >
                  Ulasan
                </Text>
                {searched.reviews.map((review, index) => {
                  return (
                    <View className="flex-row my-3" key={index}>
                      <View className="flex-1">
                        <Image
                          className="h-full"
                          resizeMode={"cover"}
                          source={{ uri: review.profile_photo_url }}
                        />
                      </View>
                      <View className="flex-4">
                        <Text numberOfLines={4}>{review.text}</Text>
                        <Text>
                          {review.author_name} ·{" "}
                          {review.relative_time_description}{" "}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      )}

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
          onPress={(data, details = null) => {
            setNearbyData(false);
            setSearched(details);
          }}
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
      {/*<View className="absolute bottom-24 self-center">
         <TouchableOpacity
          className="bg-blue-500 w-32 self-center text-center rounded-full mb-2"
          onPress={() => goToMarker()}
        >
          <Text className="text-center text-lg text-white p-2">
            Go To Marker
          </Text>
        </TouchableOpacity> 
        <View className="bg-white rounded-full opacity-50">
          <Text className="text-md p-2 text-black">{`${region.latitude}, ${region.longitude}`}</Text>
        </View>
        </View> */}

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={40}
        className="top-[95px] gap-x-3 pl-2 absolute"
        contentInset={{ top: 0, left: 20, bottom: 0, right: 20 }}
        contentContainerStyle={{
          paddingLeft: Platform.OS == "android" ? 15 : 0,
          paddingRight: Platform.OS == "android" ? 15 : 0,
        }}
      >
        {nearbySearchShortcuts.categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            className="bg-white px-3 py-0 my-0 items-center flex-row-reverse gap-x-2 rounded-full"
            onPress={async () => {
              let res = await fetch(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude}%2C${location.longitude}&radius=4000&type=restaurant&keyword=${category.keyword}&key=${GOOGLE_PLACES_API_KEY}`
              );
              let json = await res.json();
              console.log(json);
              setSearched(false);
              setNearbyData(json);
              mapRef.current.animateToRegion(
                {
                  latitude: location.latitude - 0.02,
                  longitude: location.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                },
                1.5 * 1000
              );
            }}
          >
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {nearbyData && (
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal:
              Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {nearbyData.results.map((result, index) => (
            <View key={index} style={styles.card}>
              {result.photos ? (
                <Image
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${GOOGLE_PLACES_API_KEY}`,
                  }}
                  style={styles.cardImage}
                  resizeMode={"cover"}
                />
              ) : (
                <Image
                  source={require("../../assets/images/no_image.png")}
                  style={styles.cardImage}
                  resizeMode={"cover"}
                />
              )}
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {result?.name}
                  {!result.opening_hours ? (
                    "\n"
                  ) : result.opening_hours.open_now === true ? (
                    <Text className="text-green-600"> · Buka</Text>
                  ) : (
                    <Text className="text-yellow-600"> · Sedang Tutup</Text>
                  )}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {result?.vicinity}
                </Text>

                <StarRating
                  ratings={result?.rating}
                  reviews={result?.user_ratings_total}
                />
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {
                      setSearched(result);
                      setNearbyData(false);
                    }}
                    style={[
                      styles.signIn,
                      {
                        backgroundColor: COLORS.primary,
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "white",
                        },
                      ]}
                    >
                      Kunjungi
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {}}
                    style={[
                      styles.signIn,
                      {
                        borderColor: COLORS.secondary,
                        borderWidth: 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: COLORS.secondary,
                        },
                      ]}
                    >
                      Pesan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      )}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: Platform.OS === "ios" ? 90 : 80,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    paddingHorizontal: 0,
    justifyContent: "center",
  },
  signIn: {
    width: "45%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginHorizontal: 5,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
