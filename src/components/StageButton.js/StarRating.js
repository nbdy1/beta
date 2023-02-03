import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const StarRating = (props) => {
  // This array will contain our star tags. We will include this
  // array between the view tag.
  let stars = [];
  // Loop 5 times
  for (var i = 1; i <= 5; i++) {
    // set the path to filled stars
    let name = "star";
    // If ratings is lower, set the path to unfilled stars
    if (i > props.ratings) {
      if (Math.round(props.ratings) == i) {
        name = "star-half-o";
      } else name = "star-o";
    }
    stars.push(
      <FontAwesome name={name} size={15} style={{ color: "#FF8C00" }} key={i} />
    );
  }

  return (
    <View className="flex-row  items-center">
      <Text
        style={{ fontFamily: "epi-r" }}
        className="text-sm mr-1 text-slate-600"
      >
        {JSON.stringify(props.ratings).replace(".", ",")}
      </Text>
      {stars}
      <Text
        style={{ fontFamily: "epi-r" }}
        className="text-sm ml-1 text-slate-600"
      >
        <MaterialIcons size={10} name={"people-alt"} color="#94A3B8" />{" "}
        {props.reviews}
      </Text>
    </View>
  );
};

export default StarRating;
