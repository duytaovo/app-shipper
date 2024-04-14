import React, { useState } from "react";
import { View, Text, Button, FlatList, Image, Toast } from "native-base";
import { List, Divider, useTheme } from "react-native-paper";
import { Icon, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import useGeoLocation from "../../../../../hooks/useGeoLocation";
import { saveTokenToStore } from "../../../../../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { convertAddressToCommonFormat } from "../../../../../utils/utils";

const VIETMAP_API_KEY = "9c486497752392adc6b3a4156cb889271e83b5e462f4a54f";
const VIETMAP_SEARCH_URL =
  "https://maps.vietmap.vn/api/search?api-version=1.1&";

export default function SearchBox(props: any) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [listPlace, setListPlace] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const handleNavigationToSearchResult = () => {
    setOpen(true);

    const params: any = {
      text: searchText,
      apikey: VIETMAP_API_KEY,
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions: any = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${VIETMAP_SEARCH_URL}${queryString}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setListPlace(result);
      })
      .catch((error) => console.log("error", error));
  };

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      const URL = `https://maps.vietmap.vn/api/reverse/v3?`;
      const params: any = {
        apikey: VIETMAP_API_KEY,
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      };
      const queryString = new URLSearchParams(params).toString();
      const requestOptions: any = {
        method: "GET",
        redirect: "follow",
      };
      fetch(`${URL}${queryString}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          let myPosition = JSON.parse(result);
          const commonAddressData = convertAddressToCommonFormat(myPosition[0]);
          saveTokenToStore("start", JSON.stringify(commonAddressData));
          setOpen(false);
          setSelectPosition(commonAddressData);
          navigation.navigate("Map2");
        })
        .catch((err) => Toast.show(err));
    }
  };
  const handleSearchValue = (text: string) => {
    if (!text.startsWith(" ")) {
      setSearchText(text);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Button onPress={showMyLocation}>Lấy vị trí của tôi</Button>
      <View>
        <Text>Hoặc nhập</Text>
      </View>
      <View>
        <Input
          style={{
            borderColor: "black",
            borderWidth: 1,
          }}
          size="md"
          variant="unstyled"
          value={searchText}
          onChangeText={handleSearchValue}
          placeholder={"Tìm kiếm..."}
          InputRightElement={
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleNavigationToSearchResult}
            >
              <Icon
                m="2"
                mr="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            </Button>
          }
        />
      </View>
      <View>
        {open && (
          <List.Section>
            <FlatList
              data={listPlace?.data?.features}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }: any) => (
                <TouchableOpacity
                  onPress={() => {
                    saveTokenToStore("start", JSON.stringify(item));
                    setOpen(false);
                    setSelectPosition(item);
                    navigation.navigate("Map2");
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    // backgroundColor:
                    //   index === indexCardActive
                    //     ? colors.background
                    //     : "transparent",
                  }}
                >
                  <List.Icon
                    icon={() => (
                      <Image
                        source={require("./marker.png")}
                        key={index}
                        alt="image-marker"
                      />
                    )}
                  />
                  <Text style={{ color: "black" }}>
                    {item?.properties.name}
                  </Text>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <Divider />}
            />
          </List.Section>
        )}
      </View>
    </View>
  );
}

