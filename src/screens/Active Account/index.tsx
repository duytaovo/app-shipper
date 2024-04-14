import React, { useMemo, useState } from "react";
import {
  Box,
  useToast,
  Pressable,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { activeAccount } from "../../redux/slice/user/userSlice";
import { createStyle } from "../login/style";
import { unwrapResult } from "@reduxjs/toolkit";

const ActiveAccountScreen: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const styles = useMemo(() => {
    return createStyle();
  }, []);

  const toast = useToast();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      newPassword: "",
      validatorCode: "",
    },
  });

  const onSubmit = async (data: any) => {
    if (data.phoneNumber === "" || data.validatorCode === "") {
      toast.show({
        title: "Please enter your phone number or validation code",
        placement: "top",
        // error,
      });
      return;
    } else {
      const body = {
        phoneNumber: data.phoneNumber,
        validatorCode: data.validatorCode,
      };
      try {
        await setIsSubmitting(true);
        const res = await dispatch(activeAccount(body));
        unwrapResult(res);
        const d = res?.payload.data;
        if (d?.code !== 200) return;
        toast.show({
          title: "Success",
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
    <Box style={styles.container}>
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Kích hoạt tài khoản !
      </Heading>
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Phone Number</FormControl.Label>
          <Controller
            control={control}
            name="phoneNumber"
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
          <FormControl.Label>Mã xác nhận</FormControl.Label>
          <Controller
            control={control}
            name="validatorCode"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="mail" />}
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

        <Button
          style={styles.btnSubmit}
          isLoading={isSubmitting === true}
          spinnerPlacement="end"
          isLoadingText="Submitting"
          onPress={handleSubmit(onSubmit)}
        >
          Kích hoạt tài khoản
        </Button>
      </VStack>

      <Button style={tw`mt-4`} onPress={() => navigation.goBack()}>
        Back
      </Button>
    </Box>
  );
};

export default ActiveAccountScreen;

