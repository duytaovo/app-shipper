import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import TabNavigation from "./TabNavigation";
import ProductScreen from "../screens/products/ProductScreen";
import CategoryScreen from "../screens/category/CategoryScreen";
import CartScreen from "../screens/cart/CartScreen";
import MessengerScreen from "../screens/message";
import SearchScreen from "../screens/search/SearchScreen";
import SearchResultScreen from "../screens/search-result/SearchResultScreen";

type RootStackParamList = {
  Main: any;
  Product: { id: string };
  Category: { id: string };
  Cart: undefined;
  Messenger: undefined;
  Search: undefined;
  SearchResult: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: `Giỏ hàng ` }}
      />
      <Stack.Screen
        name="Messenger"
        component={MessengerScreen}
        options={{ title: "Tin nhắn" }}
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
    </Stack.Navigator>
  );
};

export default Routes;
