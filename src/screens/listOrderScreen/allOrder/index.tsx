import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  Box,
  Text,
  Pressable,
  Button,
  Input,
  Icon,
  View,
  Toast,
  Modal,
} from "native-base";
import { ScrollView, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colorPalletter } from "../../../assets/theme/color";
import LoadingComponent from "../../../components/Loading";
import EmptyListOrder from "../../../components/shared/EmptyListOrder";
import Appbar from "../../../components/shared/Appbar";
import { createStyles } from "./style";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import {
  getOrders,
  putOrderDelivered,
  putOrderReceive,
  putOrderReject,
  putOrderRequest,
} from "../../../redux/slice/order/orderSlice";

interface RouteParams {
  status: string;
}

const OrderAllShipper = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [showModalReload, setShowModalReload] = useState(false);

  const router = useRoute();
  const { status } = router.params as RouteParams;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { orderAll } = useAppSelector((state) => state.order);
  const styles = useMemo(() => {
    return createStyles();
  }, []);
  const style = (text: string) => {
    switch (text) {
      case "Ordered":
        return "text-blue-400 ";
      case "Working":
        return "text-blue-400 ";
      case "Rejected":
        return "text-red-400 ";
      // case "Success":
      //   return "text-green-400 ";
      case "Delivered":
        return "text-yellow-400 ";
    }
  };

  useEffect(() => {
    const body = {
      orderStatus: [status],
      buyDateFrom: null,
      buyDateTo: null,
      paymentStatus: [],
    };
    const getData = async () => {
      setIsGettingData(true);
      await dispatch(
        getOrders({
          body: body,
          params: { pageNumber: currentPage, pageSize: 100 },
        }),
      );
      if (!orderAll.data.data) {
        setIsEmptyListOrder(true);
        setIsGettingData(false);
      }
      setIsGettingData(false);
    };
    getData();
  }, [dispatch, status]);

  const handleRequest = async (id: number) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderRequest({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      const body = {
        orderStatus: [status],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      await dispatch(
        getOrders({
          body: body,
          params: { pageNumber: currentPage, pageSize: 10 },
        }),
      );

      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
      // toast.error(data.data.message);
    }
  };

  const handleReceiced = async (id: number) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderReceive({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      const body = {
        orderStatus: [status],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      await dispatch(
        getOrders({
          body: body,
          params: { pageNumber: currentPage, pageSize: 10 },
        }),
      );
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
      // toast.error(data.data.message);
    }
  };

  const handleDelivery = async (id: number, item: any) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderDelivered({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      const body = {
        orderStatus: [status],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      await dispatch(
        getOrders({
          body: body,
          params: { pageNumber: currentPage, pageSize: 10 },
        }),
      );
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
      // toast.error(data.data.message);
    }
  };

  const handleReject = async (id: number) => {
    setShowModalReject(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderReject({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      const body = {
        orderStatus: [status],
        buyDateFrom: null,
        buyDateTo: null,
        paymentStatus: [],
      };
      await dispatch(
        getOrders({
          body: body,
          params: { pageNumber: currentPage, pageSize: 10 },
        }),
      );
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
      // toast.error(data.data.message);
    }
  };

  const renderListWaiting = orderAll?.data?.data?.map((item, idx: number) => {
    const displayCancelBtn = item.orderStatusString != "Ordered";
    const displayButtonDelivered = item.orderStatus === 6;
    return (
      <Box style={styles.listOrderItem} key={item.id}>
        <Box>
          <Text style={tw`font-medium `}>
            {"Họ tên:"} <Text>{item?.nameReceiver}</Text>
          </Text>

          <Pressable
            onPress={() => Linking.openURL(`tel:${item.phoneReceiver}`)}
          >
            <Text style={tw`font-medium `}>
              {"Điện thoại:"} <Text>{item?.phoneReceiver}</Text>
            </Text>
          </Pressable>

          <Text style={tw`font-medium `}>
            {"Địa chỉ: "}
            <Text>{item.addressReceiver}</Text>
          </Text>
          <Text style={tw`font-medium `}>
            {"Ngày mua: "}
            <Text>{item.buyDate.substring(0, 10)}</Text>
          </Text>
          <Text style={tw`font-medium text-red-500`}>
            {"Tổng tiền: "}
            <Text>
              {item.finalPrice}
              {"đ"}
            </Text>
          </Text>
          <View style={tw` w-fit text-blue-500`}>
            {/* {stringStatus(item.orderStatusString)} */}
            {item.paymentStatusString === "Payment success" ? (
              <Text
                style={tw`text-blue-500 uppercase  text-md  w-fit  rounded-lg`}
              >
                Đã thanh toán
              </Text>
            ) : (
              <Text
                style={tw`text-blue-500 uppercase  text-md  w-fit  rounded-lg`}
              >
                Chưa thanh toán
              </Text>
            )}
          </View>
        </Box>
        <Box>
          <Button
            style={{
              backgroundColor: colorPalletter.blue["500"],
              marginBottom: 10,
            }}
            onPress={() =>
              navigation.navigate("DetailOrder", { idOrder: item.id })
            }
          >
            Chi tiết
          </Button>

          {item.orderStatus === 4 ? (
            <div>
              <Button
                style={{
                  backgroundColor: colorPalletter.lime["500"],
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                Nhận đơn
              </Button>
              <Button
                style={{
                  backgroundColor: colorPalletter.red["500"],
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowModalReject(true);
                }}
              >
                Từ chối
              </Button>
            </div>
          ) : item.orderStatus === 5 ? (
            <Button
              style={{
                backgroundColor: colorPalletter.orange["500"],
                marginBottom: 10,
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              Đã giao hàng
            </Button>
          ) : (
            item.orderStatus === 2 && (
              <Button
                disabled={displayButtonDelivered}
                style={{
                  backgroundColor: colorPalletter.yellow["500"],
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                Yêu cầu giao
              </Button>
            )
          )}

          <Text
            style={tw`${
              style(item.orderStatusString) || "text-green-600 "
            } uppercase font-bold`}
          >
            {item.orderStatusString}
          </Text>
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Bạn có chắc chắn!</Modal.Header>
            <Modal.Footer>
              {/* <Button.Group space={2}> */}
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                No
              </Button>
              <>
                {item.orderStatus === 2 && (
                  <Button
                    onPress={() => {
                      handleRequest(item.id);
                    }}
                  >
                    Yes
                  </Button>
                )}{" "}
                {item.orderStatus === 4 && (
                  <Button
                    onPress={() => {
                      handleReceiced(item.id);
                    }}
                  >
                    Yes
                  </Button>
                )}
                {item.orderStatus === 5 && (
                  <Button
                    onPress={() => {
                      handleDelivery(item.id, item);
                    }}
                  >
                    Yes
                  </Button>
                )}
              </>
              {/* </Button.Group> */}
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalReject}
          onClose={() => setShowModalReject(false)}
        >
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
                    handleReject(item.id);
                  }}
                >
                  Yes
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalReload}
          onClose={() => setShowModalReload(false)}
        >
          <Modal.Content maxWidth="100px">
            <LoadingComponent />
          </Modal.Content>
        </Modal>
      </Box>
    );
  });

  return (
    <>
      {/* <CardCustom /> */}
      <Appbar title="" />
      {isGettingData ? (
        <LoadingComponent />
      ) : (
        <>
          {isEmptyListOrder || !orderAll.data.data ? (
            <EmptyListOrder />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Box style={styles.container}>
                <Input
                  placeholder="Search..."
                  width="full"
                  mb={"5"}
                  borderRadius="4"
                  py="3"
                  px="1"
                  fontSize="14"
                  InputLeftElement={
                    <Icon
                      m="2"
                      ml="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="search" />}
                    />
                  }
                  InputRightElement={
                    <Icon
                      m="2"
                      mr="3"
                      size="6"
                      color="gray.400"
                      as={<MaterialIcons name="mic" />}
                    />
                  }
                />
                {renderListWaiting}
              </Box>
            </ScrollView>
          )}
        </>
      )}
    </>
  );
};

export default OrderAllShipper;

