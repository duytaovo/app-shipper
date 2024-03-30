import { View } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import User from "./User";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { getShippers } from "../../../redux/slice/managerShipper/orderSlice";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { setChatByUser } from "../../../redux/slice/chat/chat";

var stompClient: any = null;
const HomeChatManager: React.FC = () => {
  console.log("admin");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const { shippers } = useAppSelector((state) => state.manageShipper);
  const [userData, setUserData] = useState({
    username: "ADMIN",
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
    setUserData({ ...userData, username: "ADMIN" });
    connect();
  }, []);
  const _getData = async () => {
    await dispatch(
      getShippers({
        params: { pageNumber: currentPage, pageSize: 100 },
      }),
    );
  };
  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();
      if (!shippers.data.data) {
        setIsEmptyListOrder(true);
      } else {
        setIsEmptyListOrder(false);
      }
      setIsGettingData(false);
    };
    getData();
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Chat 24/7",
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
            onPress={() => navigation.navigate("ChatsAdmin")}
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
        {shippers.data.data.map((item, index) => (
          <User key={item.id} item={item} stompClient={stompClient} />
        ))}
      </View>
    </View>
  );
};

export default HomeChatManager;

