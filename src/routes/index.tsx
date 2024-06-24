import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
import ActiveAccountScreen from "../screens/Active Account";
import ValidatorActiveScreen from "../screens/Active Account/ValidatorCode";
import StatisticScreen from "../screens/statisticScreen";
import StatisticScreenManager from "../screens/manager/statisticScreen";
import TrackingOrder1 from "../screens/TrackingPosition/Page1";
import TrackingOrder2 from "../screens/TrackingPosition/Page2";
import TrackingOrder3 from "../screens/TrackingPosition/Page3";
import StatisticScreenShipper from "../screens/manager/statisticScreenShipper";
import PersonalShipperScreen from "../screens/manager/personalShipper";
import UnOrderNavigator from "./UnOrderNavigator";

type RootStackParamList = {
  Main: any;
  Product: { id: string };
  Cart: undefined;
  Login: undefined;
  Messenger: undefined;
  OrderAllShipper: { status: number | string };
  UnOrderAllShipper: { status: number | string };
  OrderAllAdmin: { status: number | string };
  Search: undefined;
  SearchResult: undefined;
  MainboardShipper: undefined;
  MainboardAdmin: undefined;
  ValidatorCode: undefined;
  ForgotPassword: undefined;
  ValidatorActiveCode: undefined;
  ActiveAccount: undefined;
  WaitForDelivery: undefined;
  ShipperChat: undefined;
  ManagerChat: undefined;
  DetailOrder: { idOrder: number | string };
  ChatsAdmin: undefined;
  ChatsShipper: undefined;
  Statistic: undefined;
  ManageShipperStatistic: undefined;
  StatisticManager: undefined;
  ProfileShipperManager: undefined;
  Map: undefined;
  Map2: undefined;
  Map3: undefined;
  MapTracking1: {
    address: string;
  };
  MapTracking2: {
    address: string;
  };
  MapTracking3: undefined;
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
        name="ValidatorActiveCode"
        component={ValidatorActiveScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActiveAccount"
        component={ActiveAccountScreen}
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
        name={"UnOrderAllShipper"}
        component={UnOrderNavigator}
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
       options={{ headerShown: false }}
        name={"ProfileShipperManager"}
        component={PersonalShipperScreen}
      />
      <Stack.Screen name={"ShipperChat"} component={HomeChatShipper} />
      <Stack.Screen name={"ManagerChat"} component={HomeChatManager} />
      <Stack.Screen name="ChatsAdmin" component={ChatsScreenAdmin} />
      <Stack.Screen name="ChatsShipper" component={ChatsScreenShipper} />
      <Stack.Screen name="MessagesShipper" component={ChatMessagesShipper} />
      <Stack.Screen name="MessagesManager" component={ChatMessagesManager} />
      <Stack.Screen name="Statistic" component={StatisticScreen} />
      <Stack.Screen
        name="ManageShipperStatistic"
        component={StatisticScreenShipper}
      />
      <Stack.Screen
        name="StatisticManager"
        component={StatisticScreenManager}
      />
      <Stack.Screen name="MapTracking1" component={TrackingOrder1} />
      <Stack.Screen name="MapTracking2" component={TrackingOrder2} />
      <Stack.Screen name="MapTracking3" component={TrackingOrder3} />
    </Stack.Navigator>
  );
};

export default Routes;

