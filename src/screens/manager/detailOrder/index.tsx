import React, { useMemo, useEffect, useState } from "react";
import {
  Box,
  Text,
  Pressable,
  View,
  Image,
  Toast,
  Modal,
  Button,
} from "native-base";
import { createStyles } from "./style";
import { ScrollView, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/core";
import numberWithCommas from "../../../utils/numberWithCommas";
import AppBar from "../../../components/shared/Appbar";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import {
  getOrders,
  putOrderApprove,
  putOrderAssign,
  putOrderCancel,
  putOrderConfirm,
  putOrderReject,
  putOrderSuccess,
} from "../../../redux/slice/manager/order/orderSlice";
import LoadingComponent from "../../../components/Loading";
import { getOrderById } from "../../../redux/slice/manager/order/orderSlice";
interface RouteParams {
  idOrder: string;
}
// chi tiết đơn hàng
const DetailOrderInfo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0); // Trang hiệ
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRoute();
  const { idOrder } = router.params as RouteParams;
  const { orderDetail } = useAppSelector((state) => state.order);
  const styles = useMemo(() => {
    return createStyles();
  }, []);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [isDisableAddInButton, setIsDisableAddInButton] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await dispatch(getOrderById(idOrder));
      setIsGettingData(false);
    };
    getData();
  }, [idOrder]);

  const handleAccept = async (id: number | string) => {
    setShowModal(false);
    setIsDisableAddInButton(true);
    const res = await dispatch(putOrderConfirm(id));
    const data = res.payload?.response;
    if (data?.data?.code === 200) {
      Toast.show({ title: "Thành công", placement: "top" });
      const body = {
        orderStatus: [],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      // dispatch(
      //   getOrders({
      //     body: body,
      //     params: { pageNumber: currentPage, pageSize: 10 },
      //   }),
      // );
    } else {
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
    setTimeout(() => {
      navigation.goBack();
      setIsDisableAddInButton(false);
      // dispatch(listOrderActions.setIsReloadGettingDataCG(true));
    }, 100);
  };

  const handleAsign = async (id: number | string) => {
    setShowModal(false);
    setIsDisableAddInButton(true);
    const res = await dispatch(putOrderAssign(id));
    const data = res.payload?.response;
    if (data?.data?.code === 200) {
      Toast.show({ title: "Thành công" });
      const body = {
        orderStatus: [],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      // dispatch(
      //   getOrders({
      //     body: body,
      //     params: { pageNumber: currentPage, pageSize: 10 },
      //   }),
      // );
    } else {
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
    setTimeout(() => {
      navigation.goBack();
      // dispatch(listOrderActions.setIsReloadGettingDataCG(true));
    }, 100);
  };

  const handleApprove = async (id: number | string) => {
    setShowModal(false);
    setIsDisableAddInButton(true);
    const res = await dispatch(putOrderApprove(id));
    const data = res.payload?.response;
    if (data?.data?.code === 200) {
      Toast.show({ title: "Thành công" });
      const body = {
        orderStatus: [],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      // dispatch(
      //   getOrders({
      //     body: body,
      //     params: { pageNumber: currentPage, pageSize: 10 },
      //   }),
      // );
    } else {
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
    setTimeout(() => {
      navigation.goBack();
      // dispatch(listOrderActions.setIsReloadGettingDataCG(true));
    }, 100);
  };

  const handleReject = async (id: number | string) => {
    setShowModal(false);
    setIsDisableAddInButton(true);
    const res: any = await dispatch(putOrderReject(id));
    const data = res.payload?.response;
    if (data?.data?.code === 200) {
      Toast.show({ title: "Thành công" });
      const body = {
        orderStatus: [],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };

      // dispatch(
      //   getOrders({
      //     body: body,
      //     params: { pageNumber: currentPage, pageSize: 10 },
      //   }),
      // );
    } else {
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
    setTimeout(() => {
      navigation.goBack();
      // dispatch(listOrderActions.setIsReloadGettingDataCG(true));
    }, 100);
  };

  const handleAcceptSuccess = async (id: number | string) => {
    setShowModal(false);
    setIsDisableAddInButton(true);
    const res: any = await dispatch(putOrderSuccess(id));
    const data = res.payload?.response;
    if (data?.data?.code === 200) {
      Toast.show({ title: "Thành công" });
      const body = {
        orderStatus: [],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };

      // dispatch(
      //   getOrders({
      //     body: body,
      //     params: { pageNumber: currentPage, pageSize: 10 },
      //   }),
      // );
    } else {
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
    setTimeout(() => {
      navigation.goBack();
      // dispatch(listOrderActions.setIsReloadGettingDataCG(true));
    }, 100);
  };

  const handleCancel = async (id: number | string) => {
    setShowModal(false);
    setIsDisableAddInButton(true);
    const res: any = await dispatch(putOrderCancel(id));
    const data = res.payload?.response;
    if (data?.data?.code === 200) {
      Toast.show({ title: "Thành công" });
      const body = {
        orderStatus: [],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };

      // dispatch(
      //   getOrders({
      //     body: body,
      //     params: { pageNumber: currentPage, pageSize: 10 },
      //   }),
      // );
    } else {
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
    setTimeout(() => {
      navigation.goBack();
      // dispatch(listOrderActions.setIsReloadGettingDataCG(true));
    }, 100);
  };

  return (
    <>
      <Box style={styles.container}>
        <AppBar title="" />
        {isGettingData ? (
          <LoadingComponent />
        ) : (
          <ScrollView>
            <Box>
              <View>
                {orderDetail?.orderDetails?.map((item, index) => (
                  <View style={styles.container} key={index}>
                    <View style={styles.rowContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.image}
                          source={{ uri: item.image }}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.detail}>Màu: {item.color}</Text>
                        <Text style={styles.detail}>Ram: {item.ram}</Text>
                        <Text style={styles.detail}>
                          Bộ nhớ trong: {item.storageCapacity}
                        </Text>
                        <Text style={styles.detail}>
                          Số lượng: {item.quantity}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.priceContainer}>
                      <Text style={styles.salePrice}>{`${numberWithCommas(
                        item.salePrice,
                      )}đ`}</Text>
                      <Text style={styles.originalPrice}>{`${numberWithCommas(
                        item.price,
                      )}₫`}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Box>
            <Box style={styles.guestInfoSection}>
              {/* <Box style={styles.sellerInfoSecction}>
              <Text style={styles.sellerInfoTitleInner}>
                {"Người bán: "}
                <Text>{orderDetail?.nameShop}</Text>
              </Text>
              <Text style={styles.sellerPhoneNumberInner}>
                {orderDetail?.phoneShop}
              </Text>
            </Box> */}
              <Pressable
                onPress={() =>
                  Linking.openURL(`tel:${orderDetail?.phoneReceiver}`)
                }
              >
                <Text style={styles.guestInfoPhoneNumber}>
                  {orderDetail?.id} {"-"} {orderDetail?.phoneReceiver}
                </Text>
              </Pressable>

              <Text style={styles.guestInfoName}>
                {"Người mua:"} <Text>{orderDetail?.nameReceiver}</Text>
              </Text>
              <Text style={styles.guestInfoAddr}>
                {orderDetail?.addressReceiver}
              </Text>
              <Text style={styles.guestInfoAddr}>
                {"Ngày mua:"} {orderDetail?.buyDate.substring(0, 10)}
              </Text>
              <Text style={styles.guestInfoStatusInner}>
                {"Trạng thái: "}
                <Text style={styles.guestInfoStatusInner}>
                  {orderDetail?.orderStatusString}
                </Text>
              </Text>
            </Box>

            <Box style={styles.priceSection}>
              <Text style={styles.priceText1}>
                {"Thu hộ:"}{" "}
                <Text>
                  {orderDetail?.orderPrice}
                  {"đ"}
                </Text>
              </Text>
              <Text style={styles.priceShipText}>
                {"Tiền ship: "}{" "}
                <Text>
                  {orderDetail?.deliveryPrice}
                  {"đ"}
                </Text>
              </Text>
              <Text style={styles.priceShipText}>
                {"Giảm giá: "}{" "}
                <Text>
                  {orderDetail?.discount}
                  {"đ"}
                </Text>
              </Text>
              <Text style={styles.summaryPrice}>
                {"Tổng cộng: "}
                <Text style={styles.summaryPriceNumber}>
                  {orderDetail?.finalPrice}
                  {"đ"}
                </Text>
              </Text>
            </Box>
            <Box style={styles.btnGroupBottom}>
              <Box style={styles.btnGroupInner}>
                <Pressable
                  style={styles.btnInner1}
                  onPress={() => handleAccept(idOrder)}
                  disabled={isDisableAddInButton}
                >
                  <Box style={styles.btnTextTitle}>
                    <Text style={styles.btnTextTitleInner}>
                      {orderDetail.orderStatus === 1
                        ? "Xác nhận"
                        : orderDetail.orderStatus === 3
                        ? "Giao cho shipper"
                        : orderDetail.orderStatus === 6
                        ? "Đã giao"
                        : orderDetail.orderStatus === 2 && "Gán cho shipper"}
                    </Text>
                  </Box>
                </Pressable>
                {orderDetail.orderStatus === 2 && (
                  <Pressable
                    style={styles.btnInner2}
                    onPress={() => handleReject(idOrder)}
                  >
                    <Box style={styles.btnTextTitle}>
                      <Text style={styles.btnTextTitleInner}>
                        {/* {orderDetail.orderStatusString} */}
                        Từ chối
                      </Text>
                    </Box>
                  </Pressable>
                )}
              </Box>
            </Box>
          </ScrollView>
        )}

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Bạn có chắc chắn !</Modal.Header>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </Button>
                <Button
                  onPress={() => {
                    if (orderDetail.orderStatus === 1) {
                      handleAccept(orderDetail.id);
                    } else if (orderDetail.orderStatus === 3) {
                      handleApprove(orderDetail.id);
                    } else if (orderDetail.orderStatus === 6) {
                      handleAcceptSuccess(orderDetail.id);
                    }
                  }}
                >
                  Yes
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    </>
  );
};

export default DetailOrderInfo;

