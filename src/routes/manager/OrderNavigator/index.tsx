import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorPalletter } from "../../../assets/theme/color";
import { TABS } from "../../../constants";
import OrderAllManager from "../../../screens/manager/listOrderScreen/allOrder";

const Tab = createMaterialBottomTabNavigator();

const OrderNavigatorAdmin: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={TABS.OrderAll}
      activeColor={colorPalletter.lime[600]}
      inactiveColor={colorPalletter.gray[400]}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name={TABS.OrderAll}
        initialParams={{ status: 1 }}
        component={OrderAllManager}
        options={{
          tabBarLabel: "Đã đặt",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderComfirmed}
        initialParams={{ status: 2 }}
        component={OrderAllManager}
        options={{
          tabBarLabel: "Đã xác nhận",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderPending}
        initialParams={{ status: 3 }}
        component={OrderAllManager}
        options={{
          tabBarLabel: "Đơn yêu cầu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.waitForItTab}
        initialParams={{ status: 4 }}
        component={OrderAllManager}
        options={{
          tabBarLabel: "Chờ lấy",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderProcess}
        component={OrderAllManager}
        initialParams={{ status: 5 }}
        options={{
          tabBarLabel: "Đang giao",
          tabBarIcon: ({ color }) => (
            <Ionicons name="rocket-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        initialParams={{ status: 6 }}
        name={TABS.OrderDelivered}
        component={OrderAllManager}
        options={{
          tabBarLabel: "Đã giao",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        initialParams={{ status: 7 }}
        name={TABS.OrderSuccess}
        component={OrderAllManager}
        options={{
          tabBarLabel: "Đã hoàn thành",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done-outline" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Trả lại"
        component={OrderAll}
        options={{
          tabBarLabel: "Trả lại",
          tabBarIcon: ({ color }) => (
            <Ionicons name="refresh-outline" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default OrderNavigatorAdmin;

