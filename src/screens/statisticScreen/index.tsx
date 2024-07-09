import React, { useMemo, useState, useEffect } from "react";
import { createStyles } from "./style";
import { ScrollView, Text, ImageBackground } from "react-native";
import { useAppDispatch } from "../../hooks/useRedux";
import StatisticCardView from "../../components/shared/StatisticCardView";
import { Button, Toast, View } from "native-base";
import { getOrders } from "../../redux/slice/order/orderSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colorPalletter } from "../../assets/theme/color";
import { format } from "date-fns";
import { unwrapResult } from "@reduxjs/toolkit";
import LoadingComponent from "../../components/Loading";
const StatisticScreen: React.FC = () => {
  const styles = useMemo(() => {
    return createStyles();
  }, []);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [dataOrders, setShowDataOrders] = useState<any>();
  const onChangeStart = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateStart;
    setDateStart(currentDate);
  };

  const onChangeEnd = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || dateEnd;
    setDateEnd(currentDate);
  };

  const bodyOrders = {
    shippingId: null,
    completeDateFrom: null,
    completeDateTo: null,
    orderStatus: [0, -1, 4, 5, 22, 11],
    receiveDateFrom: format(dateStart, "yyyy-MM-dd") || null,
    receiveDateTo: format(dateEnd, "yyyy-MM-dd") || null,
    buyDateFrom: null,
    buyDateTo: null,
    deliveryDateFrom: null,
    deliveryDateTo: null,
    shipDateFrom: null,
    shipDateTo: null,
    paymentStatus: [],
    productName: null,
    customerName: null,
    customerAddress: null,
  };

  const _getData = async () => {
    const orders = await dispatch(
      getOrders({
        body: bodyOrders,
        params: { pageNumber: 0, pageSize: 100 },
      }),
    );
    unwrapResult(orders);
    setShowDataOrders(orders.payload.data);
  };

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();
      setIsGettingData(false);
    };
    getData();
  }, [dispatch]);

  const calculateStats = () => {
    if (dateStart > dateEnd) {
      Toast.show({
        title: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
        placement: "top",
      });
      return;
    } else {
      // Tính tổng số đơn hàng đã giao thành công
      const totalSuccessfulOrders = dataOrders?.data?.data?.filter(
        (order: any) => order.orderStatus === 22,
      );
      const totalRejectOrders = dataOrders?.data?.data?.filter(
        (order: any) => order.orderStatus === 0,
      ).length;
      const totalFailedOrders = dataOrders?.data?.data?.filter(
        (order: any) => order.orderStatus === -1,
      ).length;
      // Tính tổng số tiền gửi lại cho cửa hàng
      const totalRefundToShop = totalSuccessfulOrders?.reduce(
        (total: any, order: any) => total + order.orderPrice,
        0,
      );

      // Tính tổng doanh thu của shipper
      const totalShippingRevenue = totalSuccessfulOrders?.reduce(
        (total: any, order: any) => total + order.deliveryPrice,
        0,
      );

      return {
        totalSuccessfulOrders,
        totalRefundToShop,
        totalShippingRevenue,
        totalRejectOrders,
        totalFailedOrders,
      };
    }
  };

  const stats = calculateStats();
  const totalSuccessfulOrders = stats?.totalSuccessfulOrders?.length || 0;
  const totalRejectOrders = stats?.totalRejectOrders || 0;
  const totalRefundToShop = stats?.totalRefundToShop || 0;
  const totalShippingRevenue = stats?.totalShippingRevenue || 0;
  const totalFailedOrders = stats?.totalFailedOrders || 0;

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
            <DateTimePicker
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
              onPress={() => _getData()}
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
                title={"Thu nhập"}
                iconName="wallet"
                value={totalShippingRevenue?.toString()}
                unit=""
              />
              <StatisticCardView
                title={"Số tiền đã giao"}
                iconName="wallet"
                value={totalRefundToShop?.toString()}
                unit=""
              />
              <StatisticCardView
                title={"Đơn giao thất bại"}
                iconName="today"
                value={totalFailedOrders.toString()}
                unit="đơn"
                // navToPage={SCREENS_NAME.TRIP_INFO}
              />
            </ImageBackground>
          </View>
          <View style={styles.parentBox}>
            <ImageBackground
              source={require("../../../assets/images/home/a3.jpg")}
              resizeMode="cover"
              style={styles.rowContainer}
              imageStyle={styles.parentBoxBackground}
            >
              <StatisticCardView
                title={"Đơn đã nhận"}
                iconName="today"
                value={dataOrders?.data?.data?.length.toString()}
                unit="đơn"
                // navToPage={SCREENS_NAME.TRIP_INFO}
              />
              <StatisticCardView
                title={"Đơn đã giao"}
                iconName="podium"
                value={totalSuccessfulOrders?.toString()}
                unit="đơn"
                // navToPage={SCREENS_NAME.SUCCESS_INFO}
              />
              <StatisticCardView
                title={"Đơn đã bị huỷ"}
                iconName="today"
                value={totalRejectOrders?.toString()}
                unit="đơn"
                // navToPage={SCREENS_NAME.TRIP_INFO}
              />
            </ImageBackground>
          </View>
          {/* <View
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
        </View> */}
          {/* <View
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
        </View> */}
        </ScrollView>
      )}
    </>
  );
};

export default StatisticScreen;

