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

import FontWrapper from "../../components/wrapper/FontWrapper";
import HeadingWrapper from "../../components/wrapper/HeadingWrapper";
import { Avatar, Center, Text, View } from "native-base";
import { COLORS, TABS } from "../../constants";
import tw from "twrnc";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  getUser,
  getUserById,
  updateProfile,
} from "../../redux/slice/user/userSlice";
import AppBar from "../../components/shared/Appbar";

const PersonalScreen: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, userWithId } = useAppSelector((state) => state.user);
  console.log(profile);
  const navigation = useNavigation();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: profile?.fullName,
      email: profile?.email,
      phoneNumber: profile?.phoneNumber,
      address: profile?.address,
      password: "",
      imageUrl: "",
      isEnable: true,
      gender: 1,
      areaSign: "",
    },
  });

  const fetchData = async () => {
    try {
      const res = await dispatch(getUser(""));
      const result = unwrapResult(res);
      console.log(result?.data?.data?.id);
      const reslut2 = await dispatch(getUserById(result?.data?.data?.id));
      unwrapResult(reslut2);
      console.log(reslut2);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();

      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, []),
  );

  useEffect(() => {
    setValue("fullName", profile?.fullName);
    setValue("phoneNumber", profile?.phoneNumber);
    setValue("address", profile?.address);
    setValue("imageUrl", profile?.imageUrl);
    setValue("email", profile?.email);
    setValue("gender", profile?.gender);
    setValue("areaSign", profile?.areaSign);
  }, [profile, setValue]);
  const onSubmit = async (data: any) => {
    console.log(data);
    const body = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      password: data.password || "123456",
      email: data.email,
      gender: Number(data.gender),
      address: data.address,
      areaSign: data?.areaSign,
      imageUrl: null,
    };
    try {
      await setIsSubmitting(true);
      const res = await dispatch(updateProfile({ id: profile?.id, body })).then(
        unwrapResult,
      );

      // const d = res?.payload.data;
      // if (d?.code !== 200) return;
      await dispatch(getUserById(profile?.id));
      toast.show({
        title: "Cập nhật thành công",
        placement: "top",
      });
      navigation.navigate("MainboardShipper");
    } catch (error) {
      // if (
      //   isAxiosUnprocessableEntityError <
      //   ErrorResponse <
      //   SchemaRegister >> error
      // ) {
      //   const formError = error.response?.data.data;
      //   if (formError) {
      //   }
      // }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <AppBar title="Profile" />

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
          {/* <Text style={{ color: COLORS.primary }}>{profile?.fullName}</Text> */}
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
          mt="1"
        >
          Tài khoản đã kích hoạt !
        </Link>
      ) : (
        <Link
          onPress={() => navigation.navigate("ValidatorActiveCode")}
          _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500",
          }}
          alignSelf="center"
          mt="1"
        >
          Kích hoạt tài khoản !
        </Link>
      )}
      <VStack space={3} mt="5" mx={2}>
        <FormControl>
          <FormControl.Label>Tên </FormControl.Label>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                onChangeText={onChange}
                value={value}
                size="sm"
                placeholder=""
                style={styles.input}
              />
            )}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Mật khẩu</FormControl.Label>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                onChangeText={onChange}
                value={value}
                size="sm"
                placeholder=""
                style={styles.input}
                // secureTextEntry={true}
              />
            )}
          />
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<AntDesign name="mail" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={onChange}
                  value={value}
                  size="sm"
                  placeholder=""
                  style={styles.input}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Số điện thoại</FormControl.Label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<AntDesign name="phone" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={onChange}
                  value={value}
                  size="sm"
                  placeholder=""
                  style={styles.input}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Địa chỉ</FormControl.Label>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="address-book-o" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={onChange}
                  value={value}
                  size="sm"
                  placeholder=""
                  style={styles.input}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Khu vực giao hàng</FormControl.Label>
            <Controller
              control={control}
              name="areaSign"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<FontAwesome name="address-book-o" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  onChangeText={onChange}
                  value={value}
                  // isDisabled={true}
                  size="sm"
                  placeholder=""
                  style={styles.input}
                />
              )}
            />
          </FormControl>
        </FormControl>
        <Button
          style={styles.btnSubmit}
          isLoading={isSubmitting === true}
          spinnerPlacement="end"
          disabled={isSubmitting === true}
          isLoadingText="Submitting"
          onPress={handleSubmit(onSubmit)}
        >
          Lưu
        </Button>
      </VStack>

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

export default PersonalScreen;

