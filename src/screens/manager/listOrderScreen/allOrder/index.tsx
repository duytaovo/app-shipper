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
} from "native-base";
import { Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { colorPalletter } from "../../../../assets/theme/color";
import LoadingComponent from "../../../../components/Loading";
import EmptyListOrder from "../../../../components/shared/EmptyListOrder";
import Appbar from "../../../../components/shared/Appbar";
import { createStyles } from "./style";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import {
  getOrders,
  putOrderApprove,
  putOrderAssign,
  putOrderCancel,
  putOrderConfirm,
  putOrderReject,
  putOrderSuccess,
} from "../../../../redux/slice/manager/order/orderSlice";
import useDebounce from "../../../../hooks/useDebounce";
import { setQueries } from "../../../../redux/slice/querySlice";
import { getShippers } from "../../../../redux/slice/managerShipper/orderSlice";

interface RouteParams {
  status: string;
}

const OrderAllManager = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isGettingData, setIsGettingData] = useState<boolean>(false);
  const [isEmptyListOrder, setIsEmptyListOrder] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalReject, setShowModalReject] = useState(false);
  const [showModalReload, setShowModalReload] = useState(false);
  const [showModalChooseShipper, setShowModalChooseShipper] = useState(false);
  const [methodSearch, setMethodSearch] = useState("");
  const [chooseShipper, setChooseShipper] = useState("");
  const [searchValueName, setSearchValueName] = useState<string>("");
  const [searchValueProduct, setSearchValueProduct] = useState<string>("");
  const [searchValueAddress, setSearchValueAddress] = useState<string>("");
  const [searchValueIdShipping, setSearchValueIdShipping] =
    useState<string>("");

  const router = useRoute();
  const { status } = router.params as RouteParams;
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { orderAll } = useAppSelector((state) => state.order);
  const { shippers } = useAppSelector((state) => state.manageShipper);
  const [searchValue, setSearchValue] = useState<string>("");
  const debounce = useDebounce({ value: searchValue });
  const styles = useMemo(() => {
    return createStyles();
  }, []);

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

  useEffect(() => {
    const getData = async () => {
      setIsGettingData(true);
      await dispatch(
        getOrders({
          body: body,
          params: { pageNumber: currentPage, pageSize: 100 },
        }),
      );
      await dispatch(
        getShippers({
          params: { pageNumber: currentPage, pageSize: 100 },
        }),
      );

      setIsGettingData(false);
    };
    getData();
  }, [dispatch, status]);

  const handleAccept = async (id: number) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderConfirm(id));
    const data = res.payload;
    if (data?.data?.code === 200) {
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

  const handleAsign = async (id: number) => {
    setShowModal(false);
    setShowModalChooseShipper(false);
    setShowModalReload(true);
    const res = await dispatch(
      putOrderAssign({ id: id, shipperId: chooseShipper }),
    );
    const data = res.payload;
    if (data?.data?.code === 200) {
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

  const handleApprove = async (id: number) => {
    setShowModal(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderApprove(id));
    const data = res.payload;
    if (data?.data?.code === 200) {
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
    const res = await dispatch(putOrderReject(id));
    const data = res.payload;
    if (data?.data?.code === 200) {
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

  const handleAcceptSuccess = async (id: number) => {
    setShowModalReject(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderSuccess(id));
    const data = res.payload;
    if (data?.data?.code === 200) {
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

  const handleCancel = async (id: number) => {
    setShowModalReject(false);
    setShowModalReload(true);
    const res = await dispatch(putOrderCancel(id));
    const data = res.payload;
    if (data?.data?.code === 200) {
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

  const renderItem = ({ item }: { item: any }) => {
    console.log(item)
    return (
      <Box style={styles.listOrderItem} key={item.id}>
        <Box>
        <Text style={tw`font-medium `}>
            Mã đơn hàng: <Text>{item?.shippingId}</Text>
          </Text>
          <Text style={tw`font-medium `}>
            Họ tên: <Text>{item?.nameReceiver}</Text>
          </Text>

          <Pressable
            onPress={() => Linking.openURL(`tel:${item.phoneReceiver}`)}
          >
            <Text style={tw`font-medium `}>
              Điện thoại: <Text>{item?.phoneReceiver}</Text>
            </Text>
          </Pressable>

          <Text style={tw`font-medium `}>
            Địa chỉ:
            <Text>{item.addressReceiver}</Text>
          </Text>
          <Text style={tw`font-medium `}>
            Ngày mua:
            <Text>{item.buyDate.substring(0, 10)}</Text>
          </Text>
          <Text style={tw`font-medium text-red-500`}>
            Tổng tiền:
            <Text>{item.finalPrice}đ</Text>
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
            <Text>Chi tiết</Text>
          </Button>

          {item.orderStatus === 1 ? (
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
                <Text>Xác nhận</Text>
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
                <Text>Huỷ đơn</Text>
              </Button>
            </View>
          ) : item.orderStatus === 3 ? (
            <>
              <Button
                style={{
                  backgroundColor: colorPalletter.orange["500"],
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Text>Từ chối</Text>
              </Button>
              <Button
                style={{
                  backgroundColor: colorPalletter.orange["500"],
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Text>Giao cho shipper</Text>
              </Button>
            </>
          ) : item.orderStatus === 6 ? (
            <Button
              // disabled={true}
              style={{
                backgroundColor: colorPalletter.green["500"],
                marginBottom: 10,
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text>Đã giao</Text>
            </Button>
          ) : item.orderStatus === 2 ? (
            <Button
              // disabled={displayButtonDelivered}
              style={{
                backgroundColor: colorPalletter.yellow["500"],
                marginBottom: 10,
              }}
              onPress={() => {
                setShowModalChooseShipper(true);
              }}
            >
              <Text>Gán cho shipper</Text>
            </Button>
          ) : item.orderStatus === 5 ? (
            <View>
              <Button
                disabled={true}
                style={{
                  backgroundColor: colorPalletter.gray["500"],
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <Text>Đang giao hàng</Text>
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
                <Text>Huỷ đơn</Text>
              </Button>
            </View>
          ) : item.orderStatus === 4 ? (
            <Button
              disabled={true}
              style={{
                backgroundColor: colorPalletter.gray["500"],
                marginBottom: 10,
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text>Đã giao cho shipper</Text>
            </Button>
          ) : (
            <Button
              disabled={true}
              style={{
                backgroundColor: colorPalletter.gray["500"],
                marginBottom: 10,
              }}
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Text>Đã giao thành công</Text>
            </Button>
          )}

          {/* <Text
            style={tw`${
              style(item.orderStatusString) || "text-green-600 "
            } uppercase font-bold`}
          >
            {item.orderStatusString}
          </Text> */}
        </Box>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>
              <Text>Bạn có chắc chắn!</Text>
            </Modal.Header>
            <Modal.Footer>
              {/* <Button.Group space={2}> */}
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text>No</Text>
              </Button>
              <>
                {item.orderStatus === 1 && showModal ? (
                  <Button
                    onPress={() => {
                      handleAccept(item.id);
                    }}
                  >
                    <Text>Yes</Text>
                  </Button>
                ) : null}
                {item.orderStatus === 1 && showModalReject ? (
                  <Button
                    onPress={() => {
                      handleCancel(item.id);
                    }}
                  >
                    <Text>Yes</Text>
                  </Button>
                ) : null}
                {item.orderStatus === 3 ? (
                  <>
                    <Button
                      onPress={() => {
                        handleReject(item.id);
                      }}
                    >
                      <Text>Từ chối</Text>
                    </Button>
                    <Button
                      onPress={() => {
                        handleApprove(item.id);
                      }}
                    >
                      <Text>Giao cho shipper</Text>
                    </Button>
                  </>
                ) : null}
                {item.orderStatus === 6 ? (
                  <Button
                    onPress={() => {
                      handleAcceptSuccess(item.id);
                    }}
                  >
                    <Text>Yes</Text>
                  </Button>
                ) : null}
                {/* {item.orderStatus === 2 ? (
                  <Button
                    onPress={() => {
                      handleAsign(item.id);
                    }}
                  >
                    <Text>Yes</Text>
                  </Button>
                ) : null} */}
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
            <Modal.Header>
              <Text>Bạn có chắc chắn !</Text>
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
                  <Text>No</Text>
                </Button>
                <Button
                  onPress={() => {
                    handleReject(item.id);
                  }}
                >
                  <Text>Yes</Text>
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
            <View>
              {/* <LoadingComponent /> */}
              <Text>Đang xử lý ...</Text>
            </View>
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
                {shippers.data.data.map((shipper) => (
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
                <Button
                  onPress={() => {
                    handleAsign(item.id);
                  }}
                >
                  <Text>Yes</Text>
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Box>
    );
  };

  return (
    <>
      {/* <CardCustom /> */}
      <Appbar title="Đặt hàng" />
      {isGettingData ? (
        <LoadingComponent />
      ) : (
        <>
          {isEmptyListOrder || !orderAll.data.data ? (
            <EmptyListOrder />
          ) : (
            <View>
              <Stack style={styles.wrapper}>
                <View width={"1/2"} marginLeft={3}>
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
                  width: "20%",
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
              {/* <ScrollView> */}
              <FlatList
                data={orderAll.data.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
              {/* </ScrollView> */}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default OrderAllManager;

