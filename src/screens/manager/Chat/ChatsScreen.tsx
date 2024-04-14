import { ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import UserChat from "./UserChat";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { getChatUsers, setChatByUser } from "../../../redux/slice/chat/chat";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient: any = null;
const ChatsScreenAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    connected: true,
  });

  const { chats } = useAppSelector((state) => state.chatShipper);
  const _getData = async () => {
    await dispatch(
      getChatUsers({
        params: { pageNumber: currentPage, pageSize: 100 },
      }),
    );
  };
  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();
      if (!chats.data) {
        setIsEmptyListOrder(true);
      } else {
        setIsEmptyListOrder(false);
      }
      setIsGettingData(false);
    };
    getData();
  }, [dispatch]);

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

  useEffect(() => {
    // setUserData({ ...userData, username: "ADMIN" });
    // connect();
  }, []);
  const onError = (err: any) => {};

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {chats?.data?.map((item, index) => (
          <UserChat key={index} item={item} stompClient={stompClient} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreenAdmin;

