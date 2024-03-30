import React, { useEffect, useMemo, useState } from "react";
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
import { createStyle } from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { getUser, getUserById, login } from "../../redux/slice/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [show, setShow] = useState(false);
  const [errorsForm, setErrorsForm] = React.useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const styles = useMemo(() => {
    return createStyle();
  }, []);

  const toast = useToast();
  const { profile }: any = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  console.log(profile);

  const onSubmit = async (data: any) => {
    // navigation.navigate("MainboardShipper");
    // return;
    if (data.phoneNumber === "" || data.password === "") {
      setErrorsForm({ ...errors, name: "Name is required" });
      // return false;
      toast.show({
        title: "Please enter your phone number or password",
        placement: "top",
        // error,
      });
      return;
    } else {
      const body = {
        phoneNumber: data.phoneNumber,
        password: data.password,
      };
      try {
        await setIsSubmitting(true);
        const res = await dispatch(login(body));
        unwrapResult(res);
        const d = res?.payload;
        if (d == undefined) {
          return toast.show({
            title: "Số điện thoại hoặc mật khẩu sai",
            placement: "top",
          });
        } else {
          const res = await dispatch(getUser(""));
          await unwrapResult(res);
          await dispatch(getUserById(res?.payload?.data.data.id)).then(
            (res) => {
              if (res?.payload?.data.data.level == 5) {
                toast.show({
                  title: "Login success",
                  placement: "top",
                });
                navigation.navigate("MainboardAdmin");
              } else {
                toast.show({
                  title: "Login success",
                  placement: "top",
                });
                navigation.navigate("MainboardShipper");
              }
            },
          );
        }
      } catch (error: any) {
        const formError = error.code;
        console.log(error);
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
        Sign in to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isRequired isInvalid={"phoneNumber" in errorsForm}>
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
        <FormControl isRequired isInvalid={"password" in errorsForm}>
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
          <Link
            onPress={() => navigation.navigate("ValidatorCode")}
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            Forget Password?
          </Link>
        </FormControl>
        <Checkbox.Group accessibilityLabel="choose numbers">
          <Checkbox value="one" my={2}>
            Remember me
          </Checkbox>
        </Checkbox.Group>
        <Button
          style={styles.btnSubmit}
          isLoading={isSubmitting === true}
          spinnerPlacement="end"
          isLoadingText="Submitting"
          onPress={handleSubmit(onSubmit)}
        >
          Sign in
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            I'm a new user.{" "}
          </Text>
          {/* <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            href="#"
          >
            Sign Up
          </Link> */}
        </HStack>
      </VStack>

      <Button style={tw`mt-4`} onPress={() => navigation.navigate("Main")}>
        Back
      </Button>
    </Box>
  );
};

export default LoginScreen;

