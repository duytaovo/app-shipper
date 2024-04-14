import { ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import UserChat from "./UserChat";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { getChatUsers, setChatByUser } from "../../redux/slice/chat/chat";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

var stompClient: any = null;
const ChatsScreenAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const { profile } = useAppSelector((state) => state.user);
  const { chats } = useAppSelector((state) => state.chatShipper);

  const [userData, setUserData] = useState({
    username: profile.fullName,
    connected: true,
  });

  const _getData = async () => {
    await dispatch(
      getChatUsers(""),
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
    // setUserData({ ...userData, username: profile.fullName });
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

