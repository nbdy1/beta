import * as React from "react";
import { Card, Text } from "react-native-paper";

const NewsCard = ({ cardTitle, cardContent, cardImage }) => (
  <Card
    className="h-48 w-56 mr-3 rounded-lg border border-yellow-500 border-t-0"
    mode="outlined"
  >
    {/* <Card.Content>
      <Text variant="titleLarge">{cardTitle}</Text>
      <Text variant="bodyMedium">{cardContent}</Text>
    </Card.Content> */}
    <Card.Cover
      className="h-2/3 rounded-md"
      source={
        cardImage ? cardImage : require("../../assets/images/no_image.png")
      }
    />
    <Card.Title
      className="h-1/3 rounded-md"
      titleStyle={{ fontFamily: "epi-b", fontSize: 16 }}
      title={cardTitle}
      subtitleStyle={{ fontFamily: "epi-r" }}
      subtitle={cardContent}
    />
    {/* <Card.Content className="h-2/5">
      <Text className="text-lg font-bold">{cardTitle}</Text>
      <Text className="text-sm text-gray-400">{cardContent}</Text>
    </Card.Content> */}
    {/* <Card.Title title={cardTitle} subtitle={cardImage} /> */}
  </Card>
);

export default NewsCard;
