import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import NewsCard from "../components/NewsCard";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BlogCard from "../components/BlogCard";
import { COLORS, SIZES } from "../constants";

const FirstRoute = () => (
  <ScrollView
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: "fdfdfd" }}
  >
    <BlogCard
      cardTitle={"Cara Bikin Soto Betawi Yang Enak"}
      cardSubtitle={"14 Desember 2022"}
      cardAuthor={"Asep Harapan"}
      cardImage={require("../../assets/images/soto_betawi.jpg")}
    />
    <BlogCard
      cardTitle={"Nasi Uduk - Street Review"}
      cardSubtitle={"25 Mei 2022"}
      cardAuthor={"Lisa Jane"}
      cardImage={require("../../assets/images/nasi_uduk.jpg")}
    />
    <BlogCard
      cardTitle={"Apa bedanya Ketoprak sama Gado-gado?"}
      cardSubtitle={"27 Januari 2022"}
      cardAuthor={"Asep Harapan"}
    />
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: "fdfdfd" }}
  >
    <BlogCard
      cardTitle={"Jalan-jalan ke Rumah Si Pitung"}
      cardSubtitle={"10 Maret 2022"}
      cardAuthor={"Samuel Nelson"}
    />
    <BlogCard
      cardTitle={"Apa yang baru dengan Monas di 2023?"}
      cardSubtitle={"17 Juni 2022"}
      cardAuthor={"Black Panther"}
    />
    <BlogCard
      cardTitle={"Serunya Liburan Sehabis Pandemi"}
      cardSubtitle={"27 Januari 2022"}
      cardAuthor={"Julia Mentari"}
    />
  </ScrollView>
);

const ThirdRoute = () => (
  <ScrollView
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: "fdfdfd" }}
  >
    <BlogCard
      cardTitle={"Kisah Si Pitung (Versi Saya Pribadi)"}
      cardSubtitle={"10 Maret 2022"}
      cardAuthor={"Millentya Jayasakti"}
    />
    <BlogCard
      cardTitle={"Putri Keong Mas (versi orang dulu)"}
      cardSubtitle={"17 Juni 2022"}
      cardAuthor={"Fitri Purnama"}
    />
    <BlogCard
      cardTitle={"Sabeni Jagoan Tanah Abang"}
      cardSubtitle={"27 Januari 2022"}
      cardAuthor={"Russel Young"}
    />
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const BookScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-b";
  const lvlFont = "epi-m";

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Kuliner" },
    { key: "second", title: "Wisata" },
    { key: "third", title: "Cerita" },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-red-500">
      <StatusBar style="auto" />
      {/* <View className="h-15 flex-row items-center bg-white">
        <Text
          style={{ fontFamily: lvlFont }}
          className="text-3xl pl-5 pr-3 pt-8"
        >
          Perpustakaan
        </Text>
        <Ionicons name="library" size={30} color="forestgreen" />
      </View> */}
      <View className="flex-[3] pl-5 bg-red-500 border-b">
        <View className="flex-row items-center pt-3 my-3">
          <View className="mr-2">
            <Text
              style={{ fontFamily: titleFont }}
              className="text-black text-3xl"
            >
              Beta<Text className="text-black">News</Text>
            </Text>
          </View>
          <View>
            <Ionicons name="newspaper" size={35} color={"black"} />
          </View>
        </View>

        <ScrollView style={{ flexGrow: 0 }} horizontal={true}>
          <NewsCard
            cardTitle={"Festival Betawi Kembali Lagi!"}
            cardContent="15 Oktober 2022"
            cardImage={require("../../assets/images/festival_betawi.jpg")}
          />
          <NewsCard
            cardTitle={"Angka Literasi Bahasa Betawi"}
            cardContent="3 Juli 2022"
            cardImage={require("../../assets/images/bahasa_betawi.jpg")}
          />
          <NewsCard
            cardTitle={"Betawithyou telah terbit di Play Store"}
            cardContent="27 September 2022"
            cardImage={require("../../assets/images/betawithyou.png")}
          />
        </ScrollView>
      </View>
      <View className="flex-[5] bg-indigo-500">
        <View className="flex-row items-center pt-3 my-3 pl-5">
          <View className="mr-2">
            <Text
              style={{ fontFamily: titleFont }}
              className="text-black text-3xl"
            >
              Beta<Text className="text-black">Blog</Text>
            </Text>
          </View>
          <View>
            <FontAwesome5 name="pencil-alt" size={35} color={"black"} />
          </View>
          <TouchableOpacity className="absolute right-3 px-3 py-1 rounded-lg bg-primary bottom-0 border">
            <Text
              style={{ fontFamily: titleFont }}
              className="text-black text-xl"
            >
              Tulis Blog
            </Text>
          </TouchableOpacity>
        </View>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "white" }}
              style={{ borderTopWidth: 1, borderBottomWidth: 1 }}
              tabStyle={{
                backgroundColor: "#4f46e5",
                minHeight: 30,
              }} // here
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: COLORS.primary,
                    marginHorizontal: 8,
                    marginTop: 4,
                    fontFamily: "epi-b",
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          )}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
        />
      </View>
    </SafeAreaView>
  );
};

export default BookScreen;
