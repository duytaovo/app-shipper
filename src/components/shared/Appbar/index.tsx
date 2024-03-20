import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar } from "react-native-paper";

const AppBar = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  const _goBack = () => navigation.goBack();

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={title} />
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
      <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
    </Appbar.Header>
  );
};

export default AppBar;

