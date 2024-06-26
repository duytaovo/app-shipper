import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { formatTimeChat } from "../../utils/format-time";
import { getChatUserById } from "../../redux/slice/chat/chat";

interface Props {
  item: {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    gender: number;
    address: string;
    imageUrl: string;
    level: number;
    levelString: string;
    isEnable: boolean;
  };
  stompClient: any;
}

const UserChat: React.FC<Props> = ({ item, stompClient }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const { chatByUser } = useAppSelector((state) => state.chatShipper);
  const _getData = () => {
    // dispatch(getChatUserById(item.id));
  };

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();
      if (!chatByUser.data) {
        setIsEmptyListOrder(true);
      } else {
        setIsEmptyListOrder(false);
      }
      setIsGettingData(false);
    };
    getData();
  }, [dispatch]);

  const getLastMessage = () => {
    const n = chatByUser.data.length;
    return chatByUser.data[n - 1];
  };
  const lastMessage: any = getLastMessage();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("MessagesShipper", {
          receiverName: item.fullName,
          recepientId: item.id,
          stompClient: stompClient,
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#D0D0D0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbUFkI2MIsn102r0Z1GLIlhnRMwHlWgpavep5qiD840A&s",
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {item?.fullName || "Admin"}
        </Text>
        {lastMessage && (
          <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
            {lastMessage?.message}
          </Text>
        )}
      </View>

      <View>
        <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
          {lastMessage && formatTimeChat(lastMessage?.date)}
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});

