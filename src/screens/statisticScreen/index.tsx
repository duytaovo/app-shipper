import React, { useMemo, useState, useEffect } from "react";
import { createStyles } from "./style";
import { ScrollView, Text, Pressable, ImageBackground } from "react-native";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../hooks/useRedux";
import StatisticCardView from "../../components/shared/StatisticCardView";
import ChartKit from "./chartUI";
import { CheckIcon, Select, View } from "native-base";

const _dataStatisticShipper = {
  // Tổng thu nhập của ngày/tuần/tháng/năm này
  totalOrderReceived: {
    today: 25,
    week: 100,
    month: 500,
    year: 500,
  },
  // Tổng thu nhập của ngày/tuần/tháng/năm này
  totalOrderDelivered: {
    today: 25,
    week: 100,
    month: 500,
    year: 500,
  },
  // Tổng thu nhập của ngày/tuần/tháng/năm này
  totalIncome: {
    today: 250000,
    week: 1000000,
    month: 5000000,
    year: 500,
  },
  // Thu nhập từng tháng trong năm
  income12Month: [
    { name: 2022, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 22] },
    { name: 2023, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 22] },
    { name: 2024, data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 22] },
  ],
};

const StatisticScreen: React.FC = () => {
  const styles = useMemo(() => {
    return createStyles();
  }, []);

  const [time, setTime] = useState("Today");

  // const image = require("src/assets/images/imgBackground1.png");
  const {statistic} = useAppSelector((state) => state.statistic);

  const [data, setData] = useState(statistic);

  useEffect(() => {
    setData(statistic);
  }, []);

  useEffect(() => {}, [time]);
  return (
    <>
      <ScrollView style={styles.container}>
        <View width={"1/2"}>
          <Select
            background={"gray.500"}
            defaultValue="Today"
            selectedValue={time}
            minWidth="100"
            width="160"
            ml={2}
            accessibilityLabel="Chọn thời gian"
            placeholder="Chọn thời gian"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setTime(itemValue)}
          >
            <Select.Item label="Hôm nay" value="Today" />
            <Select.Item label="Tuần" value="Week" />
            <Select.Item label="Tháng" value="Month" />
            <Select.Item label="Năm" value="Year" />
          </Select>
        </View>
        <View style={styles.parentBox}>
          <ImageBackground
            source={require("../../../assets/images/home/a3.jpg")}
            resizeMode="cover"
            style={styles.rowContainer}
            imageStyle={styles.parentBoxBackground}
          >
            <StatisticCardView
              title={"Đơn đã giao"}
              iconName="today"
              value={
                time == "Today"
                  ? data.totalOrderReceived.today.toString()
                  : time == "Week"
                  ? data.totalOrderReceived.week.toString()
                  : ""
              }
              unit="đơn"
              // navToPage={SCREENS_NAME.TRIP_INFO}
            />
            <StatisticCardView
              title={"Đơn giao thành công"}
              iconName="podium"
              value={
                time == "Today" ? data.totalOrderDelivered.today.toString() : ""
              }
              unit="%"
              // navToPage={SCREENS_NAME.SUCCESS_INFO}
            />
            <StatisticCardView
              title={"Thu nhập"}
              iconName="wallet"
              value={time == "Today" ? data.totalIncome.today.toString() : ""}
              unit="VND"
            />
          </ImageBackground>
        </View>

        <View
          style={{
            marginTop: 2,
            marginRight: 2,
            width: "95%",
            margin: "auto",
          }}
        >
          <ChartKit
            labels={["T1", "T2", "T3", "T4", "T5", "T6"]}
            datasets={[
              {
                data: [
                  data?.income12Month[2].data[0],
                  data?.income12Month[2].data[1],
                  data?.income12Month[2].data[2],
                  data?.income12Month[2].data[3],
                  data?.income12Month[2].data[4],
                  data?.income12Month[2].data[5],
                ],
              },
            ]}
            style={{}}
            chartConfig={{}}
          />
        </View>
        <View
          style={{
            marginTop: 2,
            marginRight: 2,
            width: "95%",
            margin: "auto",
          }}
        >
          <ChartKit
            labels={["T7", "T8", "T9", "T10", "T11", "T12"]}
            datasets={[
              {
                data: [
                  data?.income12Month[2].data[6],
                  data?.income12Month[2].data[7],
                  data?.income12Month[2].data[8],
                  data?.income12Month[2].data[9],
                  data?.income12Month[2].data[10],
                  data?.income12Month[2].data[11],
                ],
              },
            ]}
            style={{}}
            chartConfig={{}}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default StatisticScreen;

