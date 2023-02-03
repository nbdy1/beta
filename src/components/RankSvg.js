import React from "react";
import Bronze from "../../assets/svg/Bronze.svg";
import Silver from "../../assets/svg/Silver.svg";
import Gold from "../../assets/svg/Gold.svg";
import Emerald from "../../assets/svg/Emerald.svg";
import Ruby from "../../assets/svg/Ruby.svg";
import Amethyst from "../../assets/svg/Amethyst.svg";
import Diamond from "../../assets/svg/Diamond.svg";

const RankSvg = (props) => {
  if (props.name == "Bronze") {
    return <Bronze width={props.width} height={props.height} />;
  } else if (props.name == "Silver") {
    return <Silver width={props.width} height={props.height} />;
  } else if (props.name == "Gold") {
    return <Gold width={props.width} height={props.height} />;
  } else if (props.name == "Emerald") {
    return <Emerald width={props.width} height={props.height} />;
  } else if (props.name == "Ruby") {
    return <Ruby width={props.width} height={props.height} />;
  } else if (props.name == "Amethyst") {
    return <Amethyst width={props.width} height={props.height} />;
  } else if (props.name == "Diamond") {
    return <Diamond width={props.width} height={props.height} />;
  }
};

export default RankSvg;
