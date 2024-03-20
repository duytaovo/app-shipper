/* eslint-disable react/react-in-jsx-scope */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { store } from "./src/redux/store";
import Routes from "./src/routes";
import { LinearGradient } from "expo-linear-gradient";
const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NativeBaseProvider config={config}>
            <NavigationContainer>
              <SafeAreaProvider style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <Routes />
                {/* <MyCustomDialog /> */}
              </SafeAreaProvider>
            </NavigationContainer>
          </NativeBaseProvider>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
}

