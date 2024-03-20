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
import { createStyle } from "./style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { BackHandler } from "react-native";
import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import tw from "twrnc";
import { login, registerUser } from "../../redux/slice/user/userSlice";

const RegisterScreen = () => {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const styles = useMemo(() => {
    return createStyle();
  }, []);

  const toast = useToast();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const body = {
      fullName: data.fullName,
      password: data.password,
      phoneNumber: data.phone || "0352811529",
      email: data.email || "shipper@gmail.com",
      gender: null,
      address: data.address || "TPHCM",
      imageUrl: null,
    };
    try {
      await setIsSubmitting(true);
      const res = await dispatch(registerUser(body));
      // unwrapResult(res);
      const d = res?.payload.data;
      if (d?.code !== 200) return toast.error("Error");
      toast.show({
        title: "Register success",
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
        Sign up to continue!
      </Heading>
      <VStack space={3} mt="5">
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
              name="phone"
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
          isLoadingText="Submitting"
          onPress={handleSubmit(onSubmit)}
        >
          Sign up
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            I'm had account.{" "}
          </Text>
          {/* <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            onPress={() => navigation.navigate("Login")}
          >
            Sign in
          </Link> */}
        </HStack>
      </VStack>

      <Button style={tw`mt-4`} onPress={() => navigation.navigate("Home")}>
        Back
      </Button>
    </Box>
  );
};

export default RegisterScreen;

