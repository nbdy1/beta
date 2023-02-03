import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import NewsCard from "../components/NewsCard";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BlogCard from "../components/BlogCard";

const FirstRoute = () => (
  <ScrollView
    contentContainerStyle={{ paddingBottom: 50 }}
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: "fdfdfd" }}
  >
    <BlogCard
      cardTitle={"Cara Bikin Soto Betawi"}
      cardSubtitle={"14 Desember 2022"}
      cardAuthor={"Asep Harapan"}
      cardImage={require("../../assets/images/soto_betawi.jpg")}
    />
    <BlogCard
      cardTitle={"Nasi Uduk Review"}
      cardSubtitle={"25 Mei Januari 2022"}
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
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: "#fdfdfd" }}
  />
);

const ThirdRoute = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    style={{ flex: 1, backgroundColor: "#fdfdfd" }}
  />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const BookScreen = ({ navigation }) => {
  const [c1, dc1] = ["#EF4444", "#DC2626"];
  const titleFont = "epi-bl";
  const lvlFont = "epi-m";

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Kuliner" },
    { key: "second", title: "Wisata" },
    { key: "third", title: "Cerita" },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white">
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
      <View className="flex-[3] pl-5 bg-white">
        <View className="flex-row pt-3 my-3">
          <View className="mr-1">
            <Text
              style={{ fontFamily: titleFont }}
              className="text-green-600 text-2xl"
            >
              Beta<Text className="text-green-600">News</Text>
            </Text>
          </View>
          <View>
            <Ionicons name="newspaper" size={20} color={"forestgreen"} />
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
      <View className="flex-[5]">
        <View className="flex-row pt-3 my-3 pl-5">
          <View className="mr-1">
            <Text
              style={{ fontFamily: titleFont }}
              className="text-sky-500 text-2xl"
            >
              Beta<Text className="text-sky-500">Blog</Text>
            </Text>
          </View>
          <View>
            <Ionicons name="newspaper" size={20} color={"steelblue"} />
          </View>
        </View>
        <TabView
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: "white" }}
              style={{}}
              tabStyle={{
                backgroundColor: "#0EA5E9",
                minHeight: 30,
              }} // here
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color,
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
