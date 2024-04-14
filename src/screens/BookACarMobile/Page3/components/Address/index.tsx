import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Thay thế các biểu tượng MUI bằng biểu tượng của React Native hoặc thư viện khác nếu cần
import DriveEtaOutlinedIcon from "react-native-vector-icons/MaterialIcons";
import LocationOnOutlinedIcon from "react-native-vector-icons/MaterialIcons";
import { getTokenFromStore } from "../../../../../utils/storage";
import { Input } from "@rneui/base";

export default function Address({ selectPosition, setSelectPosition }: any) {
  const [itemStart, setItemStart] = useState<any>();
  const navigation = useNavigation();

  useEffect(() => {
    getTokenFromStore("start")
      .then((start: any) => {
        setItemStart(JSON.parse(start || ""));
      })
      .catch((error: any) => {
        console.error("Error fetching start data:", error);
      });
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 10,
        }}
      >
        <DriveEtaOutlinedIcon
          name="drive-eta-outlined"
          size={30}
          color="blue"
        />
        <LocationOnOutlinedIcon name="location-on" size={30} color="red" />
      </View>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {itemStart?.properties?.name || itemStart?.display}
        </Text>

        <Input
          disabled
          value={itemStart?.properties?.name}
          defaultValue={itemStart?.properties?.name}
          placeholder={itemStart?.properties?.name}
        />
      </View>
    </View>
  );
}

