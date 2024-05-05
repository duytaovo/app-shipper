import { ScrollView, Pressable, View } from "react-native";
import React, { useEffect, useState } from "react";
import UserChat from "./UserChat";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { getChatUsers, setChatByUser } from "../../redux/slice/chat/chat";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
interface Person {
  id: number;
  fullName: string;
  phoneNumber: string;
  // ... other properties
}

function filterUniquePeopleById(data: Person[]): Person[][] {
  const uniquePeopleGroups: Person[][] = [];

  for (const person of data) {
    const matchingGroupIndex = uniquePeopleGroups.findIndex(
      (group) => group[0].id === person.id,
    );

    if (matchingGroupIndex === -1) {
      // No matching group found, create a new one
      uniquePeopleGroups.push([person]);
    } else {
      // Matching group found, add person to that group
      uniquePeopleGroups[matchingGroupIndex].push(person);
    }
  }

  return uniquePeopleGroups;
}

var stompClient: any = null;
const ChatsScreenAdmin: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const { profile } = useAppSelector((state) => state.user);
  const { chats } = useAppSelector((state) => state.chatShipper);
  const filteredGroups = filterUniquePeopleById(chats.data);
  function filterUniquePeople(data: Person[][]): Person[] {
    const uniquePeople: Person[] = [];
    const seenIds = new Set<number>();

    for (const innerArray of data) {
      for (const person of innerArray) {
        if (!seenIds.has(person.id)) {
          seenIds.add(person.id);
          uniquePeople.push(person);
        }
      }
    }

    return uniquePeople;
  }
  const filteredPeople = filterUniquePeople(filteredGroups);
  const [userData, setUserData] = useState({
    username: profile.fullName,
    connected: true,
  });
  const _getData = async () => {
    await dispatch(getChatUsers(""));
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
        {filteredPeople?.map((item: any, index) => (
          // <View key={index}>
            <UserChat key={index} item={item} stompClient={stompClient} />
          // </View>
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreenAdmin;

