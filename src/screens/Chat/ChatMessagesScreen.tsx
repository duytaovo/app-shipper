import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  getChatUserById,
  setChatByUser,
  uploadImage,
} from "../../redux/slice/chat/chat";
import { formatTimeChat } from "../../utils/format-time";
import { unwrapResult } from "@reduxjs/toolkit";

const ChatMessagesShipper: React.FC = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [recepientData, setRecepientData] = useState<any>();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null || "");
  const [message, setMessage] = useState(null || "");
  const route = useRoute();
  const { receiverName, recepientId, stompClient }: any = route.params;
  const scrollViewRef: any = useRef(null);
  const [userData, setUserData] = useState({
    username: "",
    receivername: "ADMIN",
    connected: true,
    message: "",
  });

  const dispatch = useAppDispatch();
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  let { data } = useAppSelector((state) => state.chatShipper.chatByUser);

  const { profile } = useAppSelector((state) => state.user);
  const _getData = () => {
    dispatch(getChatUserById(recepientId));
  };
  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();
      if (!data) {
        setIsEmptyListOrder(true);
      } else {
        setIsEmptyListOrder(false);
      }
      setIsGettingData(false);
    };
    getData();
  }, [dispatch]);

  const sendPrivateValue = async () => {
    if (stompClient) {
      let imageUrl = null;
      if (selectedImage) {
        let localUri = selectedImage;
        let filename: any = localUri.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let form = new FormData();
        const response1: any = await fetch(localUri as string);
        const blob = await response1.blob();
        // Assume "photo" is the name of the form field the server expects
        form.append("file", blob);
        const response = await dispatch(uploadImage(form));
        unwrapResult(response);
        imageUrl = response.payload?.data?.data;
        console.log(imageUrl);
      }

      if (message !== "" || selectedImage !== "") {
        var chatMessage = {
          senderId: profile.id,
          senderName: userData.username,
          receiverId: recepientId,
          receiverName: receiverName,
          message: message,
          date: new Date().toISOString(),
          status: "MESSAGE",
          attachmentUrl: selectedImage,
        };
        dispatch(setChatByUser(chatMessage));
        stompClient.send(
          "/app/private-message",
          {},
          JSON.stringify(chatMessage),
        );
        setMessage("");
        setSelectedImage("");
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    sendPrivateValue();
  }, [selectedImage]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result?.assets[0]?.uri);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Admin",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />

          {selectedMessages.length > 0 ? (
            <View>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {selectedMessages.length}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  resizeMode: "cover",
                }}
                source={{ uri: recepientData?.image }}
              />

              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {recepientData?.name}
              </Text>
            </View>
          )}
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="md-arrow-redo-sharp" size={24} color="black" />
            <Ionicons name="md-arrow-undo" size={24} color="black" />
            <FontAwesome name="star" size={24} color="black" />
            <MaterialIcons
              // onPress={() => deleteMessages(selectedMessages)}
              name="delete"
              size={24}
              color="black"
            />
          </View>
        ) : null,
    });
  }, [recepientData, selectedMessages]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowEmojiSelector(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const dismissKeyboardAndEmoji = () => {
    Keyboard.dismiss();
    setShowEmojiSelector(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <TouchableWithoutFeedback onPress={dismissKeyboardAndEmoji}>
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            onContentSizeChange={handleContentSizeChange}
          >
            {[...data].reverse()?.map((item: any, index: number) => {
              if (item?.message?.length > 0) {
                // const isSelected = selectedMessages.includes(item._id);
                return (
                  <Pressable
                    // onLongPress={() => handleSelectMessage(item)}
                    key={index}
                    style={[
                      item?.senderId === profile?.id
                        ? {
                            alignSelf: "flex-end",
                            backgroundColor: "#DCF8C6",
                            padding: 8,
                            maxWidth: "60%",
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: "flex-start",
                            backgroundColor: "white",
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: "60%",
                          },

                      // isSelected && { width: "100%", backgroundColor: "#F0FFFF" },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        // textAlign: isSelected ? "right" : "left",
                      }}
                    >
                      {item?.message}
                    </Text>
                    <Text
                      style={{
                        textAlign: "right",
                        fontSize: 9,
                        color: "gray",
                        marginTop: 5,
                      }}
                    >
                      {formatTimeChat(item?.date)}
                    </Text>
                  </Pressable>
                );
              }

              if (item?.attachmentUrl?.length > 5) {
                const imageUrl = item?.attachmentUrl;
                const source = { uri: imageUrl };
                return (
                  <Pressable
                    key={index}
                    style={[
                      item?.senderId === profile?.id
                        ? {
                            alignSelf: "flex-end",
                            backgroundColor: "#DCF8C6",
                            padding: 8,
                            maxWidth: "60%",
                            borderRadius: 7,
                            margin: 10,
                          }
                        : {
                            alignSelf: "flex-start",
                            backgroundColor: "white",
                            padding: 8,
                            margin: 10,
                            borderRadius: 7,
                            maxWidth: "60%",
                          },
                    ]}
                  >
                    <View>
                      <Image
                        source={source}
                        style={{ width: 200, height: 200, borderRadius: 7 }}
                      />
                      <Text
                        style={{
                          textAlign: "right",
                          fontSize: 9,
                          position: "absolute",
                          right: 10,
                          bottom: 7,
                          color: "white",
                          marginTop: 5,
                        }}
                      >
                        {formatTimeChat(item?.date)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }
            })}
          </ScrollView>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderTopWidth: 1,
              borderTopColor: "#dddddd",
              marginBottom: showEmojiSelector ? 0 : 25,
            }}
          >
            <Entypo
              onPress={handleEmojiPress}
              style={{ marginRight: 5 }}
              name="emoji-happy"
              size={24}
              color="gray"
            />

            <TextInput
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={{
                flex: 1,
                height: 40,
                borderWidth: 1,
                borderColor: "#dddddd",
                borderRadius: 20,
                paddingHorizontal: 10,
              }}
              placeholder="Type Your message..."
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7,
                marginHorizontal: 8,
              }}
            >
              <Entypo
                onPress={pickImage}
                name="camera"
                size={24}
                color="gray"
              />

              <Feather name="mic" size={24} color="gray" />
            </View>

            <Pressable
              onPress={() => sendPrivateValue()}
              style={{
                backgroundColor: "#007bff",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text>
            </Pressable>
          </View>

          {showEmojiSelector && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 250,
                backgroundColor: "white",
              }}
            >
              <EmojiSelector
                onEmojiSelected={(emoji) => {
                  setUserData({ ...userData, message: emoji.toString() });
                  setMessage((prevMessage) => prevMessage + emoji);
                }}
                columns={8}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesShipper;

const styles = StyleSheet.create({});

