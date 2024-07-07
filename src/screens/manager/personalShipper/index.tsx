import React, { useEffect, useMemo, useState } from "react";
import {
  useToast,
  Pressable,
  VStack,
  FormControl,
  Input,
  Button,
  Link,
  Icon,
} from "native-base";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import FontWrapper from "../../../components/wrapper/FontWrapper";
import { Avatar, Center, Text, View } from "native-base";
import { COLORS, TABS } from "../../../constants";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { getUser, getUserById } from "../../../redux/slice/user/userSlice";
import AppBar from "../../../components/shared/Appbar";
import { getShippers } from "../../../redux/slice/managerShipper/orderSlice";
import { Modal, Select, CheckIcon } from "native-base";
import { colorPalletter } from "../../../assets/theme/color";
import axios from "axios";

interface IUser {
  id: number;
  fullName: string;
  phoneNumber: string;
  password: string;
  email: string;
  gender: number;
  address: string;
  imageUrl: string;
  isEnable?: boolean;
  areaSign: string;
}
const PersonalShipperScreen: React.FC = () => {
  const [profile, setProfile] = useState<IUser>();
  const dispatch = useAppDispatch();
  const [chooseShipper, setChooseShipper] = useState("");
  const { shippers } = useAppSelector((state) => state.manageShipper);
  const [showModalChooseShipper, setShowModalChooseShipper] = useState(false);
  // const { profile } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(
      getShippers({
        params: { pageNumber: 0, pageSize: 100 },
      }),
    );
  }, []);
  useEffect(() => {
    const _getData = async () => {
      const _profile = await axios.get(
        `http://localhost:8081/api/user/profile/${chooseShipper}`,
      );
      setProfile(_profile?.data?.data);
    };
    _getData();
  }, [chooseShipper]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, []),
  );

  return (
    <FontWrapper>
      <View style={{ paddingBottom: 20 }}>
        <AppBar title="Quản lý thông tin shipper" />
        <Button
          height={10}
          width={40}
          // disabled={displayButtonDelivered}
          style={{
            margin: 8,
            marginBottom: 0,
            backgroundColor: colorPalletter.green["500"],
          }}
          onPress={() => {
            setShowModalChooseShipper(true);
          }}
        >
          <Text>Chọn shipper</Text>
        </Button>
        <Center>
          <Avatar
            mt={2}
            bg="purple.600"
            alignSelf="center"
            size="2xl"
            source={{
              uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
            }}
          />
          <Text style={{ color: COLORS.text }}>{profile?.fullName}</Text>
        </Center>
      </View>
      {profile?.isEnable ? (
        <Link
          _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "gray.500",
          }}
          alignSelf="center"
          mt="0"
        >
          Tài khoản đã kích hoạt !
        </Link>
      ) : (
        <Link
          _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500",
          }}
          alignSelf="center"
          mt="0"
        >
          Kích hoạt tài khoản !
        </Link>
      )}
      <VStack space={3} mt="5" mx={2}>
        <FormControl>
          <FormControl.Label>
            Tên:
            <Text style={{ color: COLORS.text }}>{profile?.fullName}</Text>
          </FormControl.Label>
          <FormControl.Label>
            Email:
            <Text style={{ color: COLORS.text }}>{profile?.email}</Text>
          </FormControl.Label>
          <FormControl>
            <FormControl.Label>
              Số điện thoại:
              <Text style={{ color: COLORS.text }}>{profile?.phoneNumber}</Text>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              Địa chỉ:
              <Text style={{ color: COLORS.text }}>{profile?.address}</Text>
            </FormControl.Label>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              Khu vực giao:
              <Text style={{ color: COLORS.text }}>{profile?.areaSign}</Text>
            </FormControl.Label>
          </FormControl>
        </FormControl>
      </VStack>
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
                onPress={() => {
                  setShowModalChooseShipper(false);
                }}
              >
                <Text>Yes</Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* <Button style={tw`mt-4`} onPress={() => navigation.navigate("Login")}>
        Back
      </Button> */}
    </FontWrapper>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: COLORS.gray,
  },
  featureIcon: {
    position: "absolute",
    top: 0,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  title: {
    flex: 1,
  },
  subTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {},
});

export default PersonalShipperScreen;

