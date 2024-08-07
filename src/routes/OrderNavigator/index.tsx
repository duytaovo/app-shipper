import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorPalletter } from "../../assets/theme/color";
import { TABS } from "../../constants";
import OrderAll from "../../screens/listOrderScreen/allOrder";

const Tab = createMaterialBottomTabNavigator();

const OrderNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={TABS.OrderAll}
      activeColor={colorPalletter.lime[600]}
      inactiveColor={colorPalletter.gray[400]}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name={TABS.OrderAll}
        initialParams={{ status: 2 }}
        component={OrderAll}
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
        component={OrderAll}
        options={{
          tabBarLabel: "Đơn đã yêu cầu",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.waitForItTab}
        initialParams={{ status: 4 }}
        component={OrderAll}
        options={{
          tabBarLabel: "Chờ lấy",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderProcess}
        component={OrderAll}
        initialParams={{ status: 5 }}
        options={{
          tabBarLabel: "Đang giao",
          tabBarIcon: ({ color }) => (
            <Ionicons name="rocket-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderFailedDilivery}
        component={OrderAll}
        initialParams={{ status: 19 }}
        options={{
          tabBarLabel: "Giao thất bại",
          tabBarIcon: ({ color }) => (
            <Ionicons name="rocket-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        initialParams={{ status: 11 }}
        name={TABS.OrderDelivered}
        component={OrderAll}
        options={{
          tabBarLabel: "Đã giao",
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

export default OrderNavigator;

