import React, { useMemo, useEffect, useState } from "react";
import { Text, Pressable, View } from "native-base";
import { createStyles } from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colorPalletter } from "../../../assets/theme/color";
import { formatSellNumber } from "../../../utils/common";
import { formatCurrency, formatMoney } from "../../../utils/utils";

const StatisticCardView = ({
  title = "Chuyến đi",
  iconName = "airplane",
  value = "0",
  unit = "đơn",
  navToPage = null,
}) => {
  const styles = useMemo(() => {
    return createStyles();
  }, []);

  const navigation = useNavigation();

  return (
    <>
      <Pressable
        onPress={() => {
          if (navToPage) {
            navigation.navigate(navToPage);
          }
        }}
      >
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={styles.textTitle}>{title}</Text>
          </View>
          <View style={styles.boxBody}>
            <Ionicons
              name={iconName}
              color={colorPalletter.lime[500]}
              size={26}
            ></Ionicons>
          </View>
          <View style={styles.boxFooter}>
            <Text style={styles.textValue}>{formatMoney(Number(value || 0))}</Text>
            <Text style={styles.textUnit}>{unit}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default StatisticCardView;

