import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Icon } from "@rneui/themed";
import React from "react";
import {
  COLORS,
  ICON_HOME,
  ICON_LIVE,
  ICON_MAIL,
  ICON_NOTIFY,
  ICON_PERSONAL,
  TABS,
} from "../constants";
import HomeScreen from "../screens/home/HomeScreen";
import NotifyScreen from "../screens/notify";
import PersonalScreen from "../screens/personal";

const Tab = createMaterialBottomTabNavigator();

const TabNavigationMaterial: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={TABS.home}
      activeColor={COLORS.primary}
      inactiveColor={COLORS.text}
      barStyle={{ backgroundColor: COLORS.white }}
    >
      <Tab.Screen
        name={TABS.home}
        options={{
          tabBarColor: COLORS.white,
          tabBarIcon: ({ focused }: any) => (
            <Icon
              {...ICON_HOME(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name={TABS.notify}
        options={{
          tabBarColor: COLORS.white,
          tabBarIcon: ({ focused }: any) => (
            <Icon
              {...ICON_NOTIFY(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={NotifyScreen}
      />

      <Tab.Screen
        name={TABS.personal}
        options={{
          tabBarColor: COLORS.white,
          tabBarIcon: ({ focused }: any) => (
            <Icon
              {...ICON_PERSONAL(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={PersonalScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationMaterial;

