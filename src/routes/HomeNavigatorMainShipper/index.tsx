import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { colorPalletter } from "../../assets/theme/color";
import { TABS } from "../../constants";
import Mainboard from "../../screens/home/Mainboard";
import PersonalScreen from "../../screens/personal";
import { AntDesign } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const HomeNavigatorMainShipper: React.FC = () => {
  console.log("shipper");

  return (
    <Tab.Navigator
      initialRouteName={TABS.mainboard}
      activeColor={colorPalletter.lime[600]}
      inactiveColor={colorPalletter.gray[400]}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name={TABS.mainboard}
        component={Mainboard}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={TABS.personal}
        component={PersonalScreen}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigatorMainShipper;

