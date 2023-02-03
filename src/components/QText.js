import { Text, StyleSheet } from "react-native";
import React from "react";
import { SIZES } from "../constants/theme";
import { COLORS } from "../constants/theme";
const sm = SIZES.base * SIZES.height * 0.001;
const xl = SIZES.base * SIZES.height * 0.0045;

const QText = ({ color, ml, size, font, mt, children }) => {
  return (
    <Text
      style={{
        fontFamily: font ? font : "epi-b",
        fontSize: size ? size : xl,
        color: color ? color : COLORS.black,
        marginTop: mt ? mt : sm,
      }}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontFamily: "epi-b",
    color: COLORS.black,
    marginTop: sm,
  },
});
export default QText;
