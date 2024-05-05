import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import DriveEtaOutlinedIcon from "react-native-vector-icons/MaterialIcons";
import { getTokenFromStore } from "../../../../../utils/storage";
import { Button } from "native-base";
import SearchBox from "../map/SearchBox";

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

  const onClick = () => {
    if (!selectPosition) {
      Alert.alert("Thông báo", "Bạn phải nhập điểm đến");
    } else {
      navigation.navigate("MapTracking3");
    }
  };

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
      </View>
      <View style={{ flex: 1 }}>
        <Entypo name="location-pin" size={24} color="black" />
        <Text numberOfLines={1} ellipsizeMode="tail">
          {itemStart?.properties?.name || itemStart?.display}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}
        >
          <Text
            style={{
              color: "black",
              opacity: 0.7,
              marginTop: 2,
              fontWeight: "700",
              marginVertical: 3,
            }}
          >
            Nhập địa điểm đến
          </Text>
        </View>
        <SearchBox
          placeholder="Nhập vị trí bạn cần đến"
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
          width={"300px"}
        />
        <Button
          onPress={onClick}
          style={{
            backgroundColor: "green",
            borderWidth: 1,
            borderColor: "rgba(54, 153, 211, 1)",
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
            paddingLeft: 0,
            flexDirection: "row",
            alignItems: "center",
            width: 300,
          }}
        >
          <Text style={{ fontSize: 14, color: "white" }}>
            Biểu diễn trên bảng đồ
          </Text>
        </Button>
      </View>
    </View>
  );
}

