import React from "react";
import tw from "twrnc";
import { Icon, Box, HStack, IconButton, View } from "native-base";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import FontWrapper from "../../../components/wrapper/FontWrapper";
import { useNavigation } from "@react-navigation/native";

const Select: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateToOrder = () => {
    navigation.navigate("OrderAllShipper", { status: 2 });
  };

  const handleNavigateToUnOrder = () => {
    navigation.navigate("UnOrderAllShipper", { status: 19 });
  };

  const handleNavigateToMessage = () => {
    navigation.navigate("ShipperChat");
  };

  const handleNavigateToStatistic = () => {
    navigation.navigate("Statistic");
  };

  const handleNavigateToMap = () => {
    navigation.navigate("Map");
  };

  return (
    <FontWrapper style={tw``}>
      <HStack justifyContent="center" mb={3}>
        <View
          marginX={4}
          width={"90%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent="center"
          // mb={3}
        >
          <Box
            style={tw`w-1/2 mr-2`}
            bg={{
              linearGradient: {
                colors: ["lightBlue.300", "violet.800"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="12"
            rounded="xl"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              textAlign: "center",
            }}
          >
            <IconButton
              icon={<Icon as={MaterialCommunityIcons} name="offer" />}
              borderRadius="full"
              _icon={{
                color: "orange.500",
                size: "4xl",
              }}
              _hover={{
                bg: "orange.600:alpha.20",
              }}
              _pressed={{
                bg: "orange.600:alpha.20",
                _icon: {
                  name: "offer",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              onPress={() => handleNavigateToOrder()}
            />
            Đơn giao
          </Box>
          <Box
            style={tw`w-1/2`}
            bg={{
              linearGradient: {
                colors: ["#FF407D", "#FFCAD4"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="12"
            rounded="xl"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              textAlign: "center",
            }}
          >
            <IconButton
              icon={<Icon as={MaterialIcons} name="message" />}
              borderRadius="full"
              _icon={{
                color: "yellow.500",
                size: "4xl",
              }}
              _hover={{
                bg: "yellow.600:alpha.20",
              }}
              _pressed={{
                bg: "yellow.600:alpha.20",
                _icon: {
                  name: "offer",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              onPress={() => handleNavigateToMessage()}
            />
            Nhắn tin
          </Box>
        </View>
      </HStack>
      <HStack justifyContent="center">
        <View
          width={"90%"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent="center"
          mb={3}
        >
          <Box
            style={tw`w-1/2 mr-2`}
            bg={{
              linearGradient: {
                colors: ["lightBlue.300", "violet.800"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="12"
            rounded="xl"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              textAlign: "center",
            }}
          >
            <IconButton
              icon={<Icon as={MaterialCommunityIcons} name="offer" />}
              borderRadius="full"
              _icon={{
                color: "orange.500",
                size: "4xl",
              }}
              _hover={{
                bg: "orange.600:alpha.20",
              }}
              _pressed={{
                bg: "orange.600:alpha.20",
                _icon: {
                  name: "offer",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              onPress={() => handleNavigateToUnOrder()}
            />
            Đơn yêu cầu trả/đổi
          </Box>
          <Box
            style={tw`w-1/2`}
            bg={{
              linearGradient: {
                colors: ["#211951", "#9BCF53"],
                start: [0, 0],
                end: [1, 0],
              },
            }}
            p="12"
            rounded="xl"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              textAlign: "center",
            }}
          >
            <IconButton
              icon={<Icon as={Ionicons} name="help-circle-outline" />}
              borderRadius="full"
              _icon={{
                color: "green.500",
                size: "4xl",
              }}
              _hover={{
                bg: "green.600:alpha.20",
              }}
              _pressed={{
                bg: "green.600:alpha.20",
                _icon: {
                  name: "offer",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              onPress={() => handleNavigateToStatistic()}
            />
            Thống kê
          </Box>
        </View>
      </HStack>
    </FontWrapper>
  );
};
export default Select;

