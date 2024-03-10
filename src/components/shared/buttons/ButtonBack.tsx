import React from "react";
import { useNavigation } from "@react-navigation/native";

import { ICON_BACK } from "../../../constants";
import MyCustomButton from "./MyCustomButton";

interface IProps {
  color?: string;
  rounded?: boolean;
  style?: any;
}
const ButtonBack: React.FC<IProps> = ({ color, rounded, style }) => {
  const navigation = useNavigation<any>();

  return (
    <MyCustomButton
      {...ICON_BACK}
      handlePress={() => navigation.goBack()}
      color={color}
      style={style}
      rounded={rounded}
    />
  );
};

export default ButtonBack;
