import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colorPalletter } from "../../assets/theme/color";
import { TABS } from "../../constants";
import OrderAll from "../../screens/listOrderScreen/allOrder";
import UnOrderAllManager from "../../screens/manager/listUnOrderScreen/unAllOrder";

const Tab = createMaterialBottomTabNavigator();

const UnOrderNavigatorManager: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={TABS.UnOrderAll}
      activeColor={colorPalletter.lime[600]}
      inactiveColor={colorPalletter.gray[400]}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name={TABS.UnOrderAll}
        initialParams={{ status: 12 }}
        component={UnOrderAllManager}
        options={{
          tabBarLabel: "Tất cả",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={TABS.OrderPending}
        initialParams={{ status: 15 }}
        component={UnOrderAllManager}
        options={{
          tabBarLabel: "Đơn đổi và trả",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.waitForItTab}
        initialParams={{ status: 18 }}
        component={UnOrderAllManager}
        options={{
          tabBarLabel: "Đơn trả hàng",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.OrderProcess}
        component={UnOrderAllManager}
        initialParams={{ status: 11 }}
        options={{
          tabBarLabel: "Đơn đã vận chuyển",
          tabBarIcon: ({ color }) => (
            <Ionicons name="rocket-outline" color={color} size={26} />
          ),
        }}
      /> */}

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

export default UnOrderNavigatorManager;

