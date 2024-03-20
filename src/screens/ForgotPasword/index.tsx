import React, { useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  useToast,
  Pressable,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Icon,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { BackHandler } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { useAppDispatch } from "../../hooks/useRedux";
import { forgotPassword } from "../../redux/slice/user/userSlice";
import { createStyle } from "../login/style";
import { ROUTES } from "../../constants";
import { unwrapResult } from "@reduxjs/toolkit";

const ForgotPassScreen: React.FC = () => {
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
    // navigation.navigate(TABS.mainboard);
    // return;
    if (
      data.phoneNumber === "" ||
      data.newPassword === "" ||
      data.validatorCode === ""
    ) {
      toast.show({
        title:
          "Please enter your phone number or new password or validation code",
        placement: "top",
        // error,
      });
      return;
    } else {
      const body = {
        phoneNumber: data.phoneNumber,
        newPassword: data.newPassword,
        validatorCode: data.validatorCode,
      };
      try {
        await setIsSubmitting(true);
        const res = await dispatch(forgotPassword(body));
        unwrapResult(res);
        const d = res?.payload.data;
        if (d?.code !== 200) return;
        toast.show({
          title: "Success",
          placement: "top",
        });
        navigation.navigate("Login");
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
        Quên mật khẩu !
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
          <FormControl.Label>New Password</FormControl.Label>
          <Controller
            control={control}
            name="newPassword"
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
          Đổi mật khẩu
        </Button>
      </VStack>

      <Button style={tw`mt-4`} onPress={() => navigation.navigate("Login")}>
        Back
      </Button>
    </Box>
  );
};

export default ForgotPassScreen;

