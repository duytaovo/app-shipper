import React, { useMemo, useEffect, useState } from "react";
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
import { Linking } from "react-native";
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
  const [methodSearch, setMethodSearch] = useState("");
  const router = useRoute();
  const { status } = router.params as RouteParams;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { orderAll } = useAppSelector((state) => state.order);
  const [searchValueName, setSearchValueName] = useState<string>("");
  const [searchValueProduct, setSearchValueProduct] = useState<string>("");
  const [searchValueAddress, setSearchValueAddress] = useState<string>("");
  const debounce = useDebounce({ value: searchValueName });
  const styles = useMemo(() => {
    return createStyles();
  }, []);
  const body = {
    orderStatus: [status],
    buyDateFrom: null,
    buyDateTo: null,
    paymentStatus: [],
    productName: searchValueProduct || null,
    customerName: searchValueName || null,
    customerAddress: searchValueAddress || null,
  };
  const style = (text: string) => {
    switch (text) {
      case "Ordered":
        return "text-blue-400 ";
      case "Working":
        return "text-blue-400 ";
      case "Rejected":
        return "text-red-400 ";
      case "Delivered":
        return "text-yellow-400 ";
      default:
        return ""; // Handle default case
    }
  };

  const _getData = async () => {
    await dispatch(
      getOrders({
        body: body,
        params: { pageNumber: currentPage, pageSize: 100 },
      }),
    );
  };

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await _getData();
      if (!orderAll.data.data) {
        setIsEmptyListOrder(true);
      } else {
        setIsEmptyListOrder(false);
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
    const res = await dispatch(putOrderReject({ orderId: id }));
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
      _getData();
      if (orderAll.data.data.length <= 0) {
        setIsEmptyListOrder(true);
        setIsGettingData(false);
      }
      setIsGettingData(false);
    };
    getData();
  };
  const renderItem = ({ item }: { item: any }) => {
    const displayButtonDelivered = item.orderStatus === 6;
    console.log(item.id);
    return (
      <Box style={styles.listOrderItem}>
        <Box>
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
            <Button
              style={{
                backgroundColor: colorPalletter.orange["500"],
                marginBottom: 10,
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text style={{ color: "white" }}>Đã giao hàng</Text>
            </Button>
          ) : item.orderStatus === 2 ? (
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
              <Text style={{ color: "white" }}>Yêu cầu giao</Text>
            </Button>
          ) : null}

          {/* <Text
            style={tw`${
              style(item.orderStatusString) || "text-green-600"
            } uppercase font-bold`}
          >
            {item.orderStatusString}
          </Text> */}
        </Box>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Bạn có chắc chắn!</Modal.Header>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
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
                    <Button
                      onPress={() => {
                        handleDelivery(item.id, item);
                      }}
                    >
                      <Text style={{ color: "white" }}>Yes</Text>
                    </Button>
                  ) : null}
                </View>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal
          isOpen={showModalReject}
          onClose={() => setShowModalReject(false)}
        >
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              <Text style={{ color: "" }}>Bạn có chắc chắn !</Text>
            </Modal.Header>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
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
          <Modal.Content maxWidth="400px">
            <View height={"1/2"} width={"full"}>
              <LoadingComponent />
              <Text>Đang xử lý ...</Text>
            </View>
          </Modal.Content>
        </Modal>
      </Box>
    );
  };

  return (
    <>
      <Appbar title="" />
      {isGettingData ? (
        <LoadingComponent />
      ) : (
        <>
          {isEmptyListOrder ? (
            <EmptyListOrder />
          ) : (
            <View>
              <Stack style={styles.wrapper}>
                <View width={"1/2"} marginLeft={3}>
                  {methodSearch === "customerName" ? (
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
                <View width={"1/2"}>
                  <Select
                    background={"gray.500"}
                    defaultValue="customerAddress"
                    selectedValue={methodSearch}
                    minWidth="100"
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
              <ScrollView>
                <FlatList
                  data={orderAll.data.data}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              </ScrollView>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default OrderAllShipper;

