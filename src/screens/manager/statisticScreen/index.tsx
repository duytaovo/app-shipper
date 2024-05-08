import React, { useMemo, useState, useEffect } from "react";
import { createStyles } from "./style";
import { ScrollView, Text, ImageBackground } from "react-native";
import StatisticCardView from "../../../components/shared/StatisticCardView";
import { Button, CheckIcon, Select, View } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorPalletter } from "../../../assets/theme/color";
import LoadingComponent from "../../../components/Loading";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { getStatistic } from "../../../redux/slice/statistic/statisticSlice";
const _statistic = {
  totalProfits: 0,
  totalNewUsers: 0,
  totalItemOrders: 0,
  totalItemOrdersPaid: 0,
};
const StatisticScreen: React.FC = () => {
  interface ProfitData {
    year: number;
    dayQuantity: number[];
  }
  const styles = useMemo(() => {
    return createStyles();
  }, []);
  const dispatch = useAppDispatch();
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [chooseYear, setChooseYear] = useState("");
  const { statistic } = useAppSelector((state) => state.statistic);

  const [dateStart, setDateStart] = useState(new Date(new Date()));
  const [dateEnd, setDateEnd] = useState(new Date());
  const [statisticLocal, setStatisticLocal] = useState(_statistic);
  const _index: number =
    Number(chooseYear) === 2024
      ? 0
      : Number(chooseYear) === 2023
      ? 1
      : Number(chooseYear) === 2022
      ? 2
      : Number(chooseYear) === 2020
      ? 3
      : Number(chooseYear) === 2021
      ? 4
      : Number(chooseYear) == 2020
      ? 5
      : 0;
  const onChangeStart = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateStart;
    setDateStart(currentDate);
  };

  const onChangeEnd = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateEnd;
    setDateEnd(currentDate);
  };

  useEffect(() => {
    dispatch(getStatistic(""));
    handleCalculateClick();
  }, []);

  useEffect(() => {
    handleCalculateClick();
  }, [statistic]);

  const handleCalculateClick = () => {
    const profitInRange = calculateInRange(
      statistic.profits[_index],
      dateStart!,
      dateEnd!,
    );
    console.log("profitInRange :" + profitInRange);
    const userInRange = calculateInRange(
      statistic.users[_index],
      dateStart!,
      dateEnd!,
    );
    const orderInRange = calculateInRange(
      statistic.orders[_index],
      dateStart!,
      dateEnd!,
    );
    const orderPaidInRange = calculateInRange(
      statistic.ordersPaid[_index],
      dateStart!,
      dateEnd!,
    );

    setStatisticLocal((prevState) => ({
      ...prevState,
      totalProfits: profitInRange,
      totalNewUsers: userInRange,
      totalItemOrders: orderInRange,
      totalItemOrdersPaid: orderPaidInRange,
    }));
  };

  const calculateInRange = (
    data: ProfitData,
    startDate: Date,
    endDate: Date,
  ): number => {
    if (!startDate || !endDate) return 0;

    const startDay = Math.floor(
      (startDate.getTime() -
        new Date(startDate.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const endDay = Math.floor(
      (endDate.getTime() - new Date(endDate.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    let totalProfit = 0;
    for (let i = startDay - 1; i <= endDay - 1; i++) {
      totalProfit += data?.dayQuantity[i];
    }

    return totalProfit;
  };
  return (
    <>
      {isGettingData ? (
        <LoadingComponent />
      ) : (
        <ScrollView style={styles.container}>
          <View
            margin={"10px"}
            width={"100%"}
            display={"flex"}
            flexDirection={"row"}
          >
            {/* <Select
              background={"gray.500"}
              selectedValue={chooseYear}
              minWidth="20"
              height={"9"}
              marginTop={"3"}
              accessibilityLabel="Chọn Shipper"
              placeholder="Chọn Shipper"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => setChooseYear(itemValue)}
            >
              <Select.Item label={"2022"} value={"2022"} />
              <Select.Item label={"2023"} value={"2023"} />
              <Select.Item label={"2024"} value={"2024"} />
              <Select.Item label={"2025"} value={"2025"} />
              <Select.Item label={"2026"} value={"2026"} />
            </Select> */}
            <DateTimePicker
              // disabledDate={(current) =>
              //   current &&
              //   (current <= dayjs(`${valueYear}/01/01T00:00:00`) ||
              //     current >= dayjs(`${valueYear + 1}/1/1T00:00:00`))
              // }
              testID="dateTimePicker"
              value={dateStart}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeStart}
            />
            <DateTimePicker
              testID="dateTimePicker"
              value={dateEnd}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
            />
            <Button
              style={{
                backgroundColor: colorPalletter.blue["500"],
                marginBottom: 10,
                margin: 10,
              }}
              onPress={() => handleCalculateClick()}
            >
              <Text style={{ color: "white" }}>Lọc</Text>
            </Button>
          </View>

          <View style={styles.parentBox}>
            <ImageBackground
              source={require("../../../assets/images/home/a3.jpg")}
              resizeMode="cover"
              style={styles.rowContainer}
              imageStyle={styles.parentBoxBackground}
            >
              <StatisticCardView
                title={"Đơn đã đặt"}
                iconName="wallet"
                value={statisticLocal.totalItemOrders?.toString() || "0"}
                unit=""
              />
              <StatisticCardView
                title={"Đơn đã thanh toán"}
                iconName="wallet"
                value={statisticLocal.totalItemOrdersPaid?.toString() || "0"}
                unit=""
              />
            </ImageBackground>
          </View>
          <View style={styles.parentBox}>
            <ImageBackground
              source={require("../../../assets/images/home/a3.jpg") || "0"}
              resizeMode="cover"
              style={styles.rowContainer}
              imageStyle={styles.parentBoxBackground}
            >
              <StatisticCardView
                title={"Số người đăng ký mới"}
                iconName="podium"
                value={statisticLocal.totalNewUsers?.toString() || "0"}
                unit=""
                // navToPage={SCREENS_NAME.SUCCESS_INFO}
              />
              <StatisticCardView
                title={"Tổng doanh thu"}
                iconName="today"
                value={statisticLocal.totalProfits?.toString() || "0"}
                unit=""
                // navToPage={SCREENS_NAME.TRIP_INFO}
              />
            </ImageBackground>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default StatisticScreen;

