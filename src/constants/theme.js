import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#fcbb40",
  secondary: "#21AF5D",
  accent: "#3498db",

  success: "#00C851",
  error: "#ff4444",

  black: "#171717",
  white: "#F5F5F5",
  divider: "#D9D9D9",
  background: "#252C4A",
  shadow: "#DEA183",
};

export const SIZES = {
  base: 10,
  width,
  height,
};

export const shadowBrutal = {
  shadowColor: "black",
  shadowOffset: { width: 10, height: 10 },
  shadowOpacity: 1,
  shadowRadius: 4.65,
  elevation: 6,
};
