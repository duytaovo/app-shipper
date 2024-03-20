import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
import LiveScreen from "../screens/live/LiveScreen";
import MailScreen from "../screens/mail";
import NotifyScreen from "../screens/notify";
import PersonalScreen from "../screens/personal";

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={TABS.home}>
      <Tab.Screen
        name={TABS.home}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_HOME(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={HomeScreen}
      />
      {/* 
      <Tab.Screen
        name={TABS.mail}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_MAIL(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={MailScreen}
      />

      <Tab.Screen
        name={TABS.live}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_LIVE}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={LiveScreen}
      />

      <Tab.Screen
        name={TABS.notify}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
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
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_PERSONAL(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={PersonalScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigation;

