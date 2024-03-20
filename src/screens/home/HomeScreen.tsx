import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Animated, ImageBackground, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import FontWrapper from "../../components/wrapper/FontWrapper";
import getHomeScreen from "../../services/getHomeScreen";
import Error from "../../components/Error/Error";
import tw from "twrnc";
import { Button, Image } from "native-base";
import SwiperSlide from "./components/SwiperSlide";
import { SliderIProps } from "../../types/slider";

const data: SliderIProps[] = [
  {
    id: "1",
    image: require("../../../assets/images/home/a3.jpg"),
    url: "",
  },
  {
    id: "2",
    image: require("../../../assets/images/home/a4.jpg"),
    url: "",
  },
  {
    id: "3",
    image: require("../../../assets/images/home/a5.jpg"),
    url: "",
  },
  // {
  //   id: "4",
  //   image: require("../../../assets/images/home/a5.jpg"),
  //   url: "",
  // },
];

const HomeScreen: React.FC = ({ navigation }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    animatedValue.setValue(offsetY);
  };

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["home"],
    queryFn: getHomeScreen,
  });
  if (isLoading)
    return (
      <View style={{ flex: 1 }}>
        {/* Image Background */}

        <ImageBackground
          source={require("../../assets/images/home/a1.jpg")}
          style={tw`flex item-center just`}
        >
          <Spinner visible={isLoading} textContent={"Loading..."}></Spinner>
        </ImageBackground>
      </View>
    );
  if (isError) return <Error handlePress={refetch} />;

  return (
    <FontWrapper style={tw`b-0`}>
      <SwiperSlide data={data} />
      <Text
        style={tw` text-center flex inset-0 justify-center align-top m-8 pt-10 text-3xl font-bold`}
      >
        The best app for shipping & delivery in this century
      </Text>
      <Button style={tw`m-4 `} onPress={() => navigation.navigate("Login")}>
        Next
      </Button>
    </FontWrapper>
  );
};

export default HomeScreen;

