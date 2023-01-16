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
  background: "#252C4A",
  shadow: "#DEA183",
};

export const SIZES = {
  base: 10,
  width,
  height,
};
