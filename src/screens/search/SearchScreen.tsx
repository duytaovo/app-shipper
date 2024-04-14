import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet } from "react-native";

import MyCustomButton from "../../components/shared/buttons/MyCustomButton";
import FontWrapper from "../../components/wrapper/FontWrapper";
import HeaderWrapper from "../../components/wrapper/HeaderWrapper";
import { COLORS, ICON_BACK } from "../../constants";
import { useAppSelector } from "../../hooks/useRedux";
import SearchInput from "./components/SearchInput";
import Error from "../../components/Error/Error";

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { name } = useAppSelector((state) => state.query);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`search-${JSON.stringify(name)}`],
    queryFn: () => {},
  });

  if (isError) return <Error handlePress={refetch} />;

  return (
    <FontWrapper>
      <HeaderWrapper style={styles.header}>
        <MyCustomButton
          {...ICON_BACK}
          handlePress={() => navigation.goBack()}
          color={COLORS.text}
        />
        <SearchInput />
      </HeaderWrapper>
    </FontWrapper>
  );
};

const styles = StyleSheet.create<any>({
  header: {
    backgroundColor: COLORS.white,
  },
  container: {},
  empty: {
    textAlign: "center",
  },
  results: {},
  result: {
    color: COLORS.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
});
export default SearchScreen;

