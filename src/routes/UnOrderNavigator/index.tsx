import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorPalletter } from "../../assets/theme/color";
import { TABS } from "../../constants";
import OrderAll from "../../screens/listOrderScreen/allOrder";
import UnOrderAllShipper from "../../screens/listUnOrderScreen/unAllOrder";

const Tab = createMaterialBottomTabNavigator();

const UnOrderNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={TABS.UnOrderAll}
      activeColor={colorPalletter.lime[600]}
      inactiveColor={colorPalletter.gray[400]}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name={TABS.UnOrderAll}
        initialParams={{ status: 19 }}
        component={UnOrderAllShipper}
        options={{
          tabBarLabel: "Đơn trả hàng",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderPending}
        initialParams={{ status: 17 }}
        component={UnOrderAllShipper}
        options={{
          tabBarLabel: "Đơn đổi và trả",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.waitForItTab}
        initialParams={{ status: 14 }}
        component={OrderAll}
        options={{
          tabBarLabel: "Đơn đổi hàng",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderProcess}
        component={OrderAll}
        initialParams={{ status: 11 }}
        options={{
          tabBarLabel: "Đơn đã vận chuyển",
          tabBarIcon: ({ color }) => (
            <Ionicons name="rocket-outline" color={color} size={26} />
          ),
        }}
      />

      {/* <Tab.Screen
        initialParams={{ status: 11 }}
        name={TABS.OrderDelivered}
        component={OrderAll}
        options={{
          tabBarLabel: "Đã giao",
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkmark-done-outline" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default UnOrderNavigator;

