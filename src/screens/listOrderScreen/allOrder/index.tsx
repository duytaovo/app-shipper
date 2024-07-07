import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  Text,
  Pressable,
  Button,
  Input,
  Icon,
  Toast,
  Stack,
  View,
  Modal,
  Select,
  Box,
  CheckIcon,
  FlatList,
  ScrollView,
} from "native-base";
import { Animated, Linking } from "react-native";
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
import useDebounce from "../../../hooks/useDebounce";
import { setQueries } from "../../../redux/slice/querySlice";
import { saveTokenToStore } from "../../../utils/storage";
import { Dimensions } from "react-native";
import {
  getShipperForShipper,
  putFailDelivery,
  putReceiveChangeDelivering,
  putReturned,
} from "../../../redux/slice/unorder/unorderSlice";
import { getShippers } from "../../../redux/slice/managerShipper/orderSlice";

interface RouteParams {
  status: string;
}
interface Shipper {
  id: number;
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: number;
  address: string;
  imageUrl: string;
  level: number;
  levelString: string;
  isEnable: boolean;
  areaSign: string;
}
const OrderAllShipper = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    animatedValue.setValue(offsetY);
  };

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [showModalReload, setShowModalReload] = useState(false);
  const [methodSearch, setMethodSearch] = useState("");
  const router = useRoute();
  const { status } = router.params as RouteParams;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { orderAll } = useAppSelector((state) => state.order);
  const [searchValueName, setSearchValueName] = useState<string>("");
  const [searchValueProduct, setSearchValueProduct] = useState<string>("");
  const [searchValueAddress, setSearchValueAddress] = useState<string>("");
  const [searchValueIdShipping, setSearchValueIdShipping] =
    useState<string>("");
  const [showModalChooseShipper, setShowModalChooseShipper] = useState(false);

  const [valueReject, setValueReject] = useState<string>("");
  const debounce = useDebounce({ value: searchValueName });
  const styles = useMemo(() => {
    return createStyles();
  }, []);
  const [chooseShipper, setChooseShipper] = useState("");
  const { shipperForShipper } = useAppSelector((state) => state.unorder);
  const [area, setArea] = useState("");
  const [filteredShippers, setFilteredShippers] = useState<Shipper[]>([]);
  const [orderCounts, setOrderCounts] = useState<Record<number, number>>({});
  useEffect(() => {
    const filterShippers = () => {
      // Tách địa chỉ giao hàng thành các từ khóa
      const keywords = area.split(/,?\s+/);
      const matchingShippers = shipperForShipper.data.data.filter((shipper) =>
        keywords.some((keyword) =>
          shipper.areaSign.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );
      setFilteredShippers(matchingShippers);
    };

    filterShippers();
  }, [shipperForShipper, area]);
  // useEffect(() => {
  //   const fetchOrderCounts = async () => {
  //     const counts: Record<number, number> = {};

  //     const fetchOrdersForShipper = async (shipperId: number) => {
  //       try {
  //         const response: any = await orderManagerService.getPurchases({
  //           body: {
  //             shippingId: null,
  //             shipperId: shipperId,
  //             completeDateFrom: null,
  //             completeDateTo: null,
  //             orderStatus: [0, -1, 4, 5, 22, 11],
  //             receiveDateFrom: null,
  //             receiveDateTo: null,
  //             buyDateFrom: null,
  //             buyDateTo: null,
  //             deliveryDateFrom: null,
  //             deliveryDateTo: null,
  //             shipDateFrom: null,
  //             shipDateTo: null,
  //             paymentStatus: [],
  //             productName: null,
  //             customerName: null,
  //             customerAddress: null,
  //           },
  //           params: { pageNumber: 0, pageSize: 100 },
  //         });
  //         return response.data.data?.totalElements;
  //       } catch (error) {
  //         console.error(
  //           `Error fetching orders for shipper ${shipperId}:`,
  //           error,
  //         );
  //         return 0;
  //       }
  //     };

  //     const promises = filteredShippers.map(async (shipper) => {
  //       const orderCount = await fetchOrdersForShipper(shipper.id);
  //       counts[shipper.id] = orderCount;
  //     });

  //     await Promise.all(promises);
  //     setOrderCounts(counts);
  //   };

  //   if (filteredShippers.length > 0) {
  //     fetchOrderCounts();
  //   }
  // }, [filteredShippers]);

  const sortedShippers = [...filteredShippers].sort(
    (a, b) => (orderCounts[a.id] || 0) - (orderCounts[b.id] || 0),
  );
  const showModalChooShipper = (order: any) => {
    setShowModalChooseShipper(true);
    setArea(order.addressReceiver);
  };
  const body = {
    shippingId: searchValueIdShipping || null,
    completeDateFrom: null,
    completeDateTo: null,
    receiveDateFrom: null,
    receiveDateTo: null,
    orderStatus: [status],
    buyDateFrom: null,
    buyDateTo: null,
    paymentStatus: [],
    productName: searchValueProduct || null,
    customerName: searchValueName || null,
    customerAddress: searchValueAddress || null,
  };

  const _getData = async () => {
    await dispatch(
      getOrders({
        body: body,
        params: { pageNumber: currentPage, pageSize: 100 },
      }),
    );
    await dispatch(
      getShipperForShipper({
        params: { pageNumber: currentPage, pageSize: 100 },
      }),
    );
  };

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();

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
      await _getData();
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });

      return null;
    }
  };

  const handleReceiced = async (id: number) => {
    console.log(id);
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderReceive({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      await _getData();
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
    }
  };

  const handleDelivery = async (id: number, item: any) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderDelivered({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      await _getData();
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
    }
  };

  const handleReject = async (id: number) => {
    setShowModalReject(false);
    setShowModalReload(true);
    const res = await dispatch(
      putOrderReject({ orderId: id, reason: valueReject }),
    );
    const data = res.payload;
    if (data?.data?.code === 200) {
      await _getData();
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
    }
  };

  const handleReceiveChangeDelivering = async (id: number) => {
    setShowModalReject(false);
    setShowModalReload(true);
    const res = await dispatch(putReceiveChangeDelivering({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      await _getData();
      setShowModalReload(false);
      setShowModal(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      setShowModal(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
    }
  };

  const handleReturned = async (id: number) => {
    setShowModalReject(false);
    setShowModalReload(true);
    const res = await dispatch(putReturned({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      await _getData();
      setShowModalReload(false);
      setShowModal(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      setShowModal(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
    }
  };
  const handleValueReject = (text: string) => {
    if (!text.startsWith(" ")) {
      setValueReject(text);
    }
  };
  const handleSearchValueIdShipping = (text: string) => {
    if (!text.startsWith(" ")) {
      setSearchValueIdShipping(text);
    }
  };

  const handleSearchValueName = (text: string) => {
    if (!text.startsWith(" ")) {
      setSearchValueName(text);
    }
  };
  const handleSearchValueProduct = (text: string) => {
    if (!text.startsWith(" ")) {
      setSearchValueProduct(text);
    }
  };
  const handleSearchValueAddress = (text: string) => {
    if (!text.startsWith(" ")) {
      setSearchValueAddress(text);
    }
  };
  useEffect(() => {
    if (!debounce.trim()) {
      dispatch(setQueries({ name: "" }));
    } else {
      dispatch(setQueries({ name: debounce }));
    }
  }, [debounce]);

  const handleNavigationToSearchResult = () => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();

      setIsGettingData(false);
    };
    getData();
  };
  const handleDeliveryFailed = async (id: number) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putFailDelivery({ orderId: id }));
    const data = res.payload;
    if (data?.data?.code === 200) {
      await _getData();
      setShowModalReload(false);
      Toast.show({ title: "Thành công", placement: "top" });
    } else {
      setShowModalReload(false);
      Toast.show({ title: "Có lỗi !!!", placement: "top" });
      return null;
    }
  };
  const renderItem = ({ item }: { item: any }) => {
    const displayButtonDelivered = item.orderStatus === 11;
    return (
      <Box style={styles.listOrderItem}>
        <Box>
          <Text style={tw`font-medium `}>
            Mã đơn hàng: <Text>{item?.id}</Text>
          </Text>
          <Text style={tw`font-medium`}>
            Họ tên: <Text>{item?.nameReceiver}</Text>
          </Text>

          <Pressable
            onPress={() => Linking.openURL(`tel:${item.phoneReceiver}`)}
          >
            <Text style={tw`font-medium`}>
              Điện thoại: <Text>{item?.phoneReceiver}</Text>
            </Text>
          </Pressable>

          <Text style={tw`font-medium`}>
            Địa chỉ:
            <Text>{item.addressReceiver}</Text>
          </Text>
          <Text style={tw`font-medium`}>
            Ngày mua:
            <Text>{item.buyDate.substring(0, 10)}</Text>
          </Text>
          <Text style={tw`font-medium text-red-500`}>
            Tổng tiền:
            <Text>{item.finalPrice}</Text>
          </Text>
          <View style={tw` w-fit text-blue-500`}>
            {item.paymentStatusString === "Payment success" ? (
              <Text
                style={tw`text-blue-500 uppercase  text-md w-fit rounded-lg`}
              >
                Đã thanh toán
              </Text>
            ) : (
              <Text
                style={tw`text-blue-500 uppercase  text-md w-fit rounded-lg`}
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
              width: "100%",
            }}
            onPress={() =>
              navigation.navigate("DetailOrder", { idOrder: item.id })
            }
          >
            <Text style={{ color: "white" }}>Chi tiết</Text>
          </Button>
          <Button
            style={{
              backgroundColor: colorPalletter.pink["500"],
              marginBottom: 10,
              width: "100%",
            }}
            onPress={() => {
              saveTokenToStore("address", JSON.stringify(item.addressReceiver));
              navigation.navigate("MapTracking1", {
                address: item.addressReceiver,
              });
            }}
          >
            <Text style={{ color: "white" }}>Xem bản đồ</Text>
          </Button>

          {item.orderStatus === 4 ? (
            <View style={{ width: "100%" }}>
              <Button
                style={{
                  backgroundColor: colorPalletter.lime["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Text style={{ color: "white" }}>Nhận đơn</Text>
              </Button>
              <Button
                style={{
                  backgroundColor: colorPalletter.red["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setShowModalReject(true);
                }}
              >
                <Text style={{ color: "white" }}>Từ chối</Text>
              </Button>
            </View>
          ) : item.orderStatus === 5 ? (
            <View>
              <Button
                style={{
                  backgroundColor: colorPalletter.orange["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Text style={{ color: "white" }}>Đã giao hàng</Text>
              </Button>
              {/* <Button
                style={{
                  backgroundColor: colorPalletter.lime["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  showModalChooShipper(item);
                }}
              >
                <Text style={{ color: "white" }}>
                  Chuyển giao cho shipper khác
                </Text>
              </Button> */}

              <Button
                style={{
                  backgroundColor: colorPalletter.red["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setShowModalFailed(true);
                }}
              >
                <Text style={{ color: "white" }}>Giao hàng thất bại</Text>
              </Button>
            </View>
          ) : item.orderStatus === 2 ? (
            <Button
              disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
                width: "100%",
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>Yêu cầu giao</Text>
            </Button>
          ) : item.orderStatus === 8 || item.orderStatus === 9 ? (
            <View>
              <Button
                disabled={displayButtonDelivered}
                style={{
                  backgroundColor: colorPalletter.yellow["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setShowModalFailed(true);
                }}
              >
                <Text style={{ color: "white" }}>Giao thất bại</Text>
              </Button>
              <Button
                disabled={displayButtonDelivered}
                style={{
                  backgroundColor: colorPalletter.yellow["500"],
                  marginBottom: 10,
                  width: "100%",
                }}
                onPress={() => {
                  setShowModalFailed(true);
                }}
              >
                <Text style={{ color: "white" }}>
                  Đơn hàng trở lại vận chuyển
                </Text>
              </Button>
            </View>
          ) : item.orderStatus === 10 ? (
            <Button
              disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
                width: "100%",
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>Shipper trả lại đơn hàng</Text>
            </Button>
          ) : item.orderStatus === 19 ? (
            <Button
              disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
                width: "100%",
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>
                Đơn hàng trả lại thành công
              </Text>
            </Button>
          ) : item.orderStatus === 20 ? (
            <Button
              disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
                width: "100%",
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>
                Chính thức giao hàng thất bại
              </Text>
            </Button>
          ) : item.orderStatus === 6 ? (
            <Button
              disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
                width: "100%",
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>
                Đơn hàng được shipper khác nhận
              </Text>
            </Button>
          ) : item.orderStatus === 7 ? (
            <Button
              disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
                width: "100%",
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>
                Đơn hàng trở lại vận chuyển
              </Text>
            </Button>
          ) : null}
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth={400}>
            <Modal.CloseButton />
            <Modal.Header>Bạn có chắc chắn!</Modal.Header>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  style={styles.btnReject}
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <Text style={{ color: "white" }}>No</Text>
                </Button>
                <View>
                  {item.orderStatus === 2 ? (
                    <Button
                      onPress={() => {
                        handleRequest(item.id);
                      }}
                    >
                      <Text style={{ color: "white" }}>Yes</Text>
                    </Button>
                  ) : null}
                  {item.orderStatus === 4 ? (
                    <Button
                      onPress={() => {
                        handleReceiced(item.id);
                      }}
                    >
                      <Text style={{ color: "white" }}>Yes</Text>
                    </Button>
                  ) : null}
                  {item.orderStatus === 5 ? (
                    <View>
                      <Button
                        onPress={() => {
                          handleDelivery(item.id, item);
                        }}
                      >
                        <Text style={{ color: "white" }}>Yes</Text>
                      </Button>
                    </View>
                  ) : null}

                  {item.orderStatus === 6 ? (
                    <View>
                      <Button
                        onPress={() => {
                          handleReceiveChangeDelivering(item.id);
                        }}
                      >
                        <Text style={{ color: "white" }}>Yes</Text>
                      </Button>
                    </View>
                  ) : null}

                  {item.orderStatus === 7 ? (
                    <View>
                      <Button
                        onPress={() => {
                          handleReceiced(item.id);
                        }}
                      >
                        <Text style={{ color: "white" }}>Yes</Text>
                      </Button>
                    </View>
                  ) : null}
                  {item.orderStatus === 19 ? (
                    <View>
                      <Button
                        onPress={() => {
                          handleReturned(item.id);
                        }}
                      >
                        <Text style={{ color: "white" }}>Yes</Text>
                      </Button>
                    </View>
                  ) : null}
                </View>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Modal
          isOpen={showModalChooseShipper}
          onClose={() => setShowModalChooseShipper(false)}
        >
          <Modal.Content maxWidth="400px" maxHeight={"400px"}>
            <Modal.CloseButton />
            <Modal.Header>
              <Text>Chọn shipper giao hàng !</Text>
            </Modal.Header>
            <View width={"full"}>
              <Select
                background={"gray.500"}
                selectedValue={chooseShipper}
                minWidth="20"
                height={"60"}
                accessibilityLabel="Chọn Shipper"
                placeholder="Chọn Shipper"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setChooseShipper(itemValue)}
              >
                {filteredShippers?.map((shipper) => (
                  <Select.Item
                    key={shipper.id}
                    label={shipper.fullName}
                    value={shipper.id.toString()}
                  />
                ))}
              </Select>
            </View>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModalChooseShipper(false);
                  }}
                >
                  <Text>No</Text>
                </Button>
                {/* <Button
                  onPress={() => {
                    handleChangeDelivering(item.id);
                  }}
                >
                  <Text>Yes</Text>
                </Button> */}
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalFailed}
          onClose={() => setShowModalFailed(false)}
        >
          <Modal.Content maxWidth="400px" maxHeight={"400px"}>
            <Modal.CloseButton />
            <Modal.Header>
              <Text>Giao hàng thất bại</Text>
            </Modal.Header>
            <View width={"full"}></View>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModalFailed(false);
                  }}
                >
                  <Text>No</Text>
                </Button>
                <Button
                  onPress={() => {
                    handleDeliveryFailed(item.id);
                  }}
                >
                  <Text>Yes</Text>
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalReject}
          onClose={() => setShowModalReject(false)}
        >
          <Modal.Content maxWidth={400}>
            <Modal.CloseButton />
            <Modal.Header>
              <Text style={{ color: "" }}>Vui lòng nhập lý do từ chối !</Text>
            </Modal.Header>
            <Modal.Content maxWidth={400}>
              <View height={"1/2"} width={"full"}>
                <Input
                  size="md"
                  variant="unstyled"
                  value={valueReject}
                  onChangeText={handleValueReject}
                  placeholder={"Lý do..."}
                  style={styles.input}
                />
              </View>
            </Modal.Content>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  style={styles.btnReject}
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  <Text style={{ color: "" }}>No</Text>
                </Button>
                <Button
                  onPress={() => {
                    handleReject(item.id);
                  }}
                >
                  <Text style={{ color: "" }}>Yes</Text>
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalReload}
          onClose={() => setShowModalReload(false)}
        >
          <Modal.Content maxWidth={400}>
            <View>
              {/* <LoadingComponent /> */}
              <Text>Đang xử lý ...</Text>
            </View>
          </Modal.Content>
        </Modal>
      </Box>
    );
  };

  return (
    <>
      <Appbar title="Đặt hàng" />
      {isGettingData ? (
        <LoadingComponent />
      ) : (
        <>
          {isEmptyListOrder ? (
            <EmptyListOrder />
          ) : (
            <View>
              <View>
                <Stack style={styles.wrapper}>
                  <View
                    width={Dimensions.get("window").width / 2}
                    marginLeft={3}
                  >
                    {methodSearch === "customerIdShipping" ? (
                      <Input
                        size="md"
                        variant="unstyled"
                        value={searchValueIdShipping}
                        onChangeText={handleSearchValueIdShipping}
                        placeholder={"Tìm kiếm..."}
                        style={styles.input}
                        InputRightElement={
                          <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                              handleNavigationToSearchResult();
                            }}
                          >
                            <Icon
                              m="2"
                              mr="3"
                              size="6"
                              color="gray.400"
                              as={<MaterialIcons name="search" />}
                            />
                          </Button>
                        }
                      />
                    ) : methodSearch === "customerName" ? (
                      <Input
                        size="md"
                        variant="unstyled"
                        value={searchValueName}
                        onChangeText={handleSearchValueName}
                        placeholder={"Tìm kiếm..."}
                        style={styles.input}
                        InputRightElement={
                          <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                              handleNavigationToSearchResult();
                            }}
                          >
                            <Icon
                              m="2"
                              mr="3"
                              size="6"
                              color="gray.400"
                              as={<MaterialIcons name="search" />}
                            />
                          </Button>
                        }
                      />
                    ) : methodSearch === "customerAddress" ? (
                      <Input
                        size="md"
                        variant="unstyled"
                        value={searchValueAddress}
                        onChangeText={handleSearchValueAddress}
                        placeholder={"Tìm kiếm..."}
                        style={styles.input}
                        InputRightElement={
                          <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                              handleNavigationToSearchResult();
                            }}
                          >
                            <Icon
                              m="2"
                              mr="3"
                              size="6"
                              color="gray.400"
                              as={<MaterialIcons name="search" />}
                            />
                          </Button>
                        }
                      />
                    ) : (
                      <Input
                        size="md"
                        variant="unstyled"
                        value={searchValueProduct}
                        onChangeText={handleSearchValueProduct}
                        placeholder={"Tìm kiếm..."}
                        style={styles.input}
                        width={200} // Adjust width here
                        InputRightElement={
                          <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                              handleNavigationToSearchResult();
                            }}
                          >
                            <Icon
                              m="2"
                              mr="3"
                              size="6"
                              color="gray.400"
                              as={<MaterialIcons name="search" />}
                            />
                          </Button>
                        }
                      />
                    )}
                  </View>
                  <View width={Dimensions.get("window").width / 2}>
                    <Select
                      background={"gray.500"}
                      defaultValue="customerAddress"
                      selectedValue={methodSearch}
                      minWidth={100} // Adjust width here
                      width="160"
                      ml={2}
                      accessibilityLabel="Chọn phương thức"
                      placeholder="Chọn phương thức"
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      mt={1}
                      onValueChange={(itemValue) => setMethodSearch(itemValue)}
                    >
                      <Select.Item
                        label="Tìm kiếm theo mã đơn"
                        value="customerIdShipping"
                      />
                      <Select.Item
                        label="Tìm kiếm theo tên"
                        value="customerName"
                      />
                      <Select.Item
                        label="Tìm kiếm theo địa chỉ"
                        value="customerAddress"
                      />
                      <Select.Item
                        label="Tìm kiếm theo sản phẩm"
                        value="productName"
                      />
                    </Select>
                  </View>
                </Stack>
                <Button
                  style={{
                    backgroundColor: colorPalletter.blue["500"],
                    marginBottom: 10,
                    width: "100%",
                    marginLeft: 10,
                  }}
                  onPress={() => {
                    setSearchValueAddress("");
                    setSearchValueName("");
                    setSearchValueProduct("");
                    setSearchValueIdShipping("");
                  }}
                >
                  <Text style={{ color: "white" }}>Xoá</Text>
                </Button>
                {/* <SafeAreaView style={styles.container}> */}

                {/* </SafeAreaView> */}
              </View>

              <FlatList
                overflowY={"scroll"}
                data={orderAll.data.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                // showsVerticalScrollIndicator={false}
              />
            </View>
          )}
        </>
      )}
    </>
  );
};

export default OrderAllShipper;

