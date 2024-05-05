import { ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import UserChat from "./UserChat";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { getChatUsers, setChatByUser } from "../../../redux/slice/chat/chat";
import { over } from "stompjs";
import SockJS from "sockjs-client";
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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    connected: true,
  });

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
        {filteredPeople?.map((item: any, index) => (
          // <div key={index}>
            <UserChat key={index} item={item} stompClient={stompClient} />
          // </div>
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreenAdmin;

