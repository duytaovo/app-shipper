import React, { useEffect, useMemo, useState } from "react";
import {
  useToast,
  Pressable,
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
} from "native-base";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import FontWrapper from "../../components/wrapper/FontWrapper";
import HeadingWrapper from "../../components/wrapper/HeadingWrapper";
import { Avatar, Center, Text, View } from "native-base";
import { COLORS } from "../../constants";
import tw from "twrnc";
import { createStyle } from "../login/style";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import {
  getUser,
  getUserById,
  updateProfile,
} from "../../redux/slice/user/userSlice";

const PersonalScreen: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { profile, userWithId } = useAppSelector((state) => state.user);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      address: profile.address,
      password: "",
      imageUrl: "",
      isEnable: true,
      gender: 1,
    },
  });

  useEffect(() => {
    const _getData = async () => {
      const res = await dispatch(getUser(""));
      await unwrapResult(res);
      await dispatch(getUserById(res?.payload?.data.data.id));
    };
    _getData();
  }, []);
  useEffect(() => {
    setValue("fullName", profile.fullName);
    setValue("phoneNumber", profile.phoneNumber);
    setValue("address", profile.address);
    setValue("imageUrl", profile.imageUrl);
    setValue("email", profile.email);
    setValue("gender", profile.gender);
  }, [profile, setValue]);
  const onSubmit = async (data: any) => {
    const body = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      password: data.password || "123456",
      email: data.email,
      gender: Number(data.gender),
      address: data.address,
      imageUrl: null,
    };
    try {
      await setIsSubmitting(true);
      const res = await dispatch(
        updateProfile({ id: profile.id, body }),
      ).then(unwrapResult);

      const d = res?.payload.data;
      if (d?.code !== 200) return;
      toast.show({
        title: "Update success",
        placement: "top",
      });
      dispatch(getUserById(profile.id));
      // navigation.navigate(TABS.mainboard);
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
      <View style={{ paddingBottom: 80 }}>
        <HeadingWrapper style={tw`flex justify-between items-center `}>
          <AntDesign name="profile" size={24} color="black" style={tw`m-3`} />
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.subTitle}>
            {/* <Text style={{ color: COLORS.primary }}>View all</Text> */}
            {/* <Icon
                  {...ICON_ARROW_NEXT}
                  color={COLORS.primary}
                  style={styles.icon}
                /> */}
          </TouchableOpacity>
        </HeadingWrapper>
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
          <Text style={{ color: COLORS.primary }}>My name</Text>
        </Center>
      </View>
      <VStack space={3} mt="5" mx={2}>
        <FormControl>
          <FormControl.Label>User name</FormControl.Label>
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
          <FormControl.Label>Password</FormControl.Label>
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
            <FormControl.Label>Phone</FormControl.Label>
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
            <FormControl.Label>Address</FormControl.Label>
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

