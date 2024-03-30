import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { colorPalletter } from "../../assets/theme/color";
import { TABS } from "../../constants";
import PersonalScreen from "../../screens/personal";
import { AntDesign } from "@expo/vector-icons";
import Mainboard from "../../screens/manager/home/Mainboard";

const Tab = createMaterialBottomTabNavigator();

const HomeNavigatorMainAdmin: React.FC = () => {
  console.log("admin");
  
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

export default HomeNavigatorMainAdmin;

