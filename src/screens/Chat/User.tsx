import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const User = ({ item, stompClient }: any) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("MessagesShipper", {
          receiverName: item.fullName,
          recepientId: item.id,
          stompClient: stompClient,
        })
      }
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.imageUrl }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.fullName}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>
    </Pressable>
  );
};

export default User;

