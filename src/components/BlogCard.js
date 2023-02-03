import * as React from "react";
import { View, Image } from "react-native";
import { Card, Text } from "react-native-paper";

const BlogCard = ({ cardTitle, cardSubtitle, cardImage, cardAuthor }) => (
  <View className="w-full h-36 px-6 items-center flex-row border-b border-sky-100">
    <View className="w-16 h-16 bg-transparent rounded-lg overflow-hidden">
      <Image
        className="object-fill w-full h-full"
        source={
          cardImage ? cardImage : require("../../assets/images/no_image.png")
        }
      />
    </View>
    <View className="mx-5">
      <Text
        numberOfLines={2}
        style={{ fontFamily: "epi-b" }}
        className="text-xl"
      >
        {cardTitle}
      </Text>
      <Text style={{ fontFamily: "epi-r" }} className="text-sm">
        {cardAuthor + " ·"} {cardSubtitle}
      </Text>
    </View>
  </View>
);

export default BlogCard;
