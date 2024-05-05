import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Image, Toast } from "native-base";
import { List, Divider } from "react-native-paper";
import { Icon, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { saveTokenToStore } from "../../../../../utils/storage";
import { useRoute } from "@react-navigation/native";

const VIETMAP_API_KEY = "9c486497752392adc6b3a4156cb889271e83b5e462f4a54f";
const MAP_API_KEY = "AIzaSyBI7135GTiX4YEAiKVqf-sD8DizXl0ONlQ";
const VIETMAP_SEARCH_URL =
  "https://maps.vietmap.vn/api/search?api-version=1.1&";
const MAP_API_SEARCH_URL = ``;

interface RouteParams {
  address: string;
}

const convertAddressToCommonFormat = (addressData: any) => {
  if (addressData.geometry && addressData.geometry.location) {
    const { location } = addressData.geometry;
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
      properties: {
        layer: "venue",
        name: addressData.address_components[0]?.long_name || "",
        distance: null,
        accuracy: "point",
        region: addressData.address_components[3]?.long_name || "",
        region_gid: null,
        county: addressData.address_components[2]?.long_name || "",
        county_gid: null,
        locality: addressData.address_components[1]?.long_name || "",
        locality_gid: null,
        label: addressData.formatted_address || "",
        address: null,
        addendum: null,
        block: null,
        floor: null,
      },
      bbox: [location.lng, location.lat, location.lng, location.lat],
      Id: addressData.place_id || null,
    };
  } else {
    // Xử lý trường hợp không có dữ liệu hình học hoặc vị trí
    console.error("Dữ liệu không có trường geometry hoặc location");
    return null;
  }
};

export default function SearchBox(props: any) {
  const { setSelectPosition } = props;
  const [listPlace, setListPlace] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const router = useRoute();
  const { address } = router.params as RouteParams;
  const [searchText, setSearchText] = useState<string>(address);
  useEffect(() => {
    const getPosition = async () => {
      const requestOptions: any = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${MAP_API_KEY}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          const convertedData = convertAddressToCommonFormat(
            result?.results[0],
          );
          saveTokenToStore("end", JSON.stringify(convertedData));
          setOpen(false);
          setSelectPosition(convertedData);
        })
        .catch((error) => Toast.show(error.message));
    };
    getPosition();
  }, [address]);
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

  const handleSearchValue = (text: string) => {
    if (!text.startsWith(" ")) {
      setSearchText(text);
    }
  };
  return (
    <View style={{ flex: 1 }}>
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
                    saveTokenToStore("end", JSON.stringify(item));
                    setOpen(false);
                    setSelectPosition(item);
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

