import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MessengerScreen from "../screens/message";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search-result/SearchResultScreen";
import TabNavigationLogin from "./TabNavigationLogin";
import HomeScreen from "../screens/home/HomeScreen";
import HomeNavigatorMainShipper from "./HomeNavigatorMainShipper";
import ValidatorScreen from "../screens/ForgotPasword/ValidatorCode";
import ForgotPassScreen from "../screens/ForgotPasword";
import DetailOrderInfo from "../screens/detailOrder";
import OrderNavigator from "./OrderNavigator";
import HomeNavigatorMainAdmin from "./HomeNavigatorMainManager";
import OrderNavigatorAdmin from "./manager/OrderNavigator";
import HomeChatShipper from "../screens/Chat/HomeScreen";
import HomeChatManager from "../screens/manager/Chat/HomeScreen";
import ChatsScreenAdmin from "../screens/manager/Chat/ChatsScreen";
import ChatsScreenShipper from "../screens/Chat/ChatsScreen";
import ChatMessagesShipper from "../screens/Chat/ChatMessagesScreen";
import ChatMessagesManager from "../screens/manager/Chat/ChatMessagesScreen";

type RootStackParamList = {
  Main: any;
  Product: { id: string };
  Cart: undefined;
  Login: undefined;
  Messenger: undefined;
  OrderAllShipper: { status: number | string };
  OrderAllAdmin: { status: number | string };
  Search: undefined;
  SearchResult: undefined;
  MainboardShipper: undefined;
  MainboardAdmin: undefined;
  ValidatorCode: undefined;
  ForgotPassword: undefined;
  WaitForDelivery: undefined;
  ShipperChat: undefined;
  ManagerChat: undefined;
  DetailOrder: { idOrder: number | string };
  ChatsAdmin: undefined;
  ChatsShipper: undefined;
  MessagesShipper: {
    recepientId: number | string;
    stompClient: any;
    receiverName: string;
  };
  MessagesManager: {
    recepientId: number | string;
    stompClient: any;
    receiverName: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Main"}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Messenger"
        component={MessengerScreen}
        options={{ title: "Tin nhắn" }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={TabNavigationLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ValidatorCode"
        component={ValidatorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"MainboardShipper"}
        component={HomeNavigatorMainShipper}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"MainboardAdmin"}
        component={HomeNavigatorMainAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"OrderAllShipper"}
        component={OrderNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"OrderAllAdmin"}
        component={OrderNavigatorAdmin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"DetailOrder"}
        component={DetailOrderInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"ShipperChat"}
        component={HomeChatShipper}
      ></Stack.Screen>
      <Stack.Screen
        name={"ManagerChat"}
        component={HomeChatManager}
      ></Stack.Screen>
      <Stack.Screen name="ChatsAdmin" component={ChatsScreenAdmin} />
      <Stack.Screen name="ChatsShipper" component={ChatsScreenShipper} />
      <Stack.Screen name="MessagesShipper" component={ChatMessagesShipper} />
      <Stack.Screen name="MessagesManager" component={ChatMessagesManager} />
    </Stack.Navigator>
  );
};

export default Routes;

