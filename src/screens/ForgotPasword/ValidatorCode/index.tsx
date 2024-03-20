import React, { useMemo, useState } from "react";
import {
  Box,
  useToast,
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
import { createStyle } from "../../login/style";
import { getCodeValidator } from "../../../redux/slice/user/userSlice";
import { useAppDispatch } from "../../../hooks/useRedux";
import { ROUTES } from "../../../constants";
import tailwind from "twrnc";
import { unwrapResult } from "@reduxjs/toolkit";

const ValidatorScreen: React.FC = () => {
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
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    // navigation.navigate(TABS.mainboard);
    // return;
    if (data.phoneNumber === "" || data.email === "") {
      toast.show({
        title: "Please enter your phone number or email",
        placement: "top",
        // error,
      });
      return;
    } else {
      const body = {
        phoneNumber: data.phoneNumber,
        email: data.email,
        validatorType: 1,
      };
      try {
        await setIsSubmitting(true);
        const res = await dispatch(getCodeValidator(body));
        unwrapResult(res);
        const d = res?.payload.data;
        console.log(d);
        if (d?.code !== 200) return;
        toast.show({
          title: "Success",
          placement: "top",
        });
        navigation.navigate("ForgotPassword");
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
        Validator code!
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
          <FormControl.Label>Email</FormControl.Label>
          <Controller
            control={control}
            name="email"
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
          Lấy mã xác nhận
        </Button>
      </VStack>

      <Button style={tailwind`mt-4`} onPress={() => navigation.navigate("Login")}>
        Back
      </Button>
    </Box>
  );
};

export default ValidatorScreen;

