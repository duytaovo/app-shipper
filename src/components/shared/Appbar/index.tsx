import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Appbar } from "react-native-paper";

const AppBar = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  const _goBack = () => navigation.goBack();

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={title} />
      {/* <Appbar.Action icon="magnify" onPress={_handleSearch} /> */}
    </Appbar.Header>
  );
};

export default AppBar;

