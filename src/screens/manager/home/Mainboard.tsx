import React, { useRef } from "react";
import tw from "twrnc";
import { VStack, Input, Icon, Text, View, FlatList } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import Select from "./components/Select";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import CardProduct from "./components/card/Card";
import ScrollRefreshWrapper from "../../../components/wrapper/ScrollRefreshWrapper";
import AppBar from "../../../components/shared/Appbar";
import HeadingWrapper from "../../../components/wrapper/HeadingWrapper";
import { COLORS } from "../../../constants";
const MainboardAdmin: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    animatedValue.setValue(offsetY);
  };
  const handleNavigateToCategory = () => {
    // navigation.navigate(ROUTES.category, { id: data?.categories?.[0]?._id });
  };
  return (
    <ScrollRefreshWrapper
      onScroll={(e) => handleScroll(e)}
      onRefresh={() => {}}
      style={styles.container}
    >
      <AppBar title="" />
      <VStack
        w="100%"
        space={5}
        // alignSelf="center"
        style={tw`flex items-center `}
      >
        <Card.Cover
          style={tw`w-[90%]  m-[24px]`}
          source={{
            uri: "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/11/lam-nghe-shipper-1.jpg",
          }}
        />
        <Input
          placeholder="Search..."
          width="90%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="mic" />}
            />
          }
        />
        <Select />
      </VStack>
      <ScrollRefreshWrapper
        onScroll={(e) => handleScroll(e)}
        onRefresh={() => {}}
        style={tw`mt-[10px] mx-3 rounded`}
      >
        {/* product relative */}
        {1 > 0 && (
          <View style={{ paddingBottom: 80 }}>
            <HeadingWrapper>
              <Text style={styles.title}>Transaction History</Text>
              <TouchableOpacity
                onPress={() => handleNavigateToCategory()}
                style={styles.subTitle}
              >
                <Text style={{ color: COLORS.primary }}>View all</Text>
                {/* <Icon
                  {...ICON_ARROW_NEXT}
                  color={COLORS.primary}
                  style={styles.icon}
                /> */}
              </TouchableOpacity>
            </HeadingWrapper>

            <FlatList
              data={[]}
              renderItem={({ item }: any) => (
                <CardProduct product={item} border horizontal />
              )}
              // keyExtractor={(item) => item._id}
              horizontal
            />
          </View>
        )}
      </ScrollRefreshWrapper>
    </ScrollRefreshWrapper>
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

export default MainboardAdmin;

