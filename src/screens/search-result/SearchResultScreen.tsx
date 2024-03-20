import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import ListCardVertical from "../../components/shared/card/ListCardVertical";
import FontWrapper from "../../components/wrapper/FontWrapper";
import ScrollRefreshWrapper from "../../components/wrapper/ScrollRefreshWrapper";
import { COLORS } from "../../constants";
import { useAppSelector } from "../../hooks/useRedux";
import FilterModal from "./components/FilterModal";
import Error from "../../components/Error/Error";
import Filter from "../../components/shared/Filter";

const SearchResultScreen: React.FC = () => {
  const { name, createdAt, sell_number, price } = useAppSelector(
    (state) => state.query,
  );
  const navigation = useNavigation<any>();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`list-product-${name}-${createdAt}-${sell_number}-${price}}`],
    // queryFn: () => searchProductByName(name),
  });

  if (isError) return <Error handlePress={refetch} />;

  const handleFilter = () => {
    console.log("handleFilter");
  };

  return (
    <FontWrapper>
      {/* <HeaderBackgroundOpacity style={styles.header}>
        <MyCustomButton
          {...ICON_BACK}
          handlePress={() => navigation.goBack()}
          color={COLORS.text}
        />
        <SearchUI placeholder={name} />
        <MyCustomButton {...ICON_FILTER} handlePress={handleFilter} color={COLORS.text} />
      </HeaderBackgroundOpacity> */}

      <Filter />
      <FilterModal />

      {/* items */}
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
});
export default SearchResultScreen;

