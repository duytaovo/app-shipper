import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getShippers } from "../../redux/slice/managerShipper/orderSlice";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { setChatByUser } from "../../redux/slice/chat/chat";
import User from "./User";

const admin = [
  {
    id: 2,
    fullName: "ADMIN",
    phoneNumber: "0123456789",
    email: "admin@techstore.com",
    gender: 1,
    address: "HCM",
    imageUrl: "test",
    level: 5,
    levelString: "Diamond",
    isEnable: false,
  },
];

var stompClient: any = null;
const HomeChatShipper: React.FC = () => {
  console.log("shipper");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState({
    username: profile.fullName,
    connected: true,
  });
  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage,
    );
    userJoin();
  };
  const onPrivateMessage = (payload: any) => {
    dispatch(setChatByUser(JSON.parse(payload.body)));
  };
  const connect = () => {
    let Sock = new SockJS("http://localhost:8081/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onError = (err: any) => {};
  useEffect(() => {
    setUserData({ ...userData, username: profile.fullName });
    connect();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="black"
        />
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            onPress={() => navigation.navigate("ChatsShipper")}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          {/* <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          /> */}
        </View>
      ),
    });
  }, []);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {admin.map((item, index) => (
          <User key={item.id} item={item} stompClient={stompClient} />
        ))}
      </View>
    </View>
  );
};

export default HomeChatShipper;

const styles = StyleSheet.create({});

