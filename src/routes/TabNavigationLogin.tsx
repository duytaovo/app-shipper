import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/themed";
import React from "react";
import { COLORS, ICON_HOME, ICON_MAIL, TABS } from "../constants";
import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";

const Tab = createBottomTabNavigator();

const TabNavigationLogin: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={TABS.login}>
      <Tab.Screen
        name={TABS.login}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_HOME(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={LoginScreen}
      />

      <Tab.Screen
        name={TABS.register}
        options={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: ({ focused }) => (
            <Icon
              {...ICON_MAIL(focused)}
              color={focused ? COLORS.primary : COLORS.text}
            />
          ),
        }}
        component={RegisterScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationLogin;

