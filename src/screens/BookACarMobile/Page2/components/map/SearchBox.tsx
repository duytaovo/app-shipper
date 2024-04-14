import React, { useState } from "react";
import { View, Text, Button, FlatList, Image } from "native-base";
import { List, Divider, useTheme } from "react-native-paper";
import { Icon, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { saveTokenToStore } from "../../../../../utils/storage";

const VIETMAP_API_KEY = "9c486497752392adc6b3a4156cb889271e83b5e462f4a54f";
const VIETMAP_SEARCH_URL =
  "https://maps.vietmap.vn/api/search?api-version=1.1&";

export default function SearchBox(props: any) {
  const { setSelectPosition } = props;
  const [searchText, setSearchText] = useState<string>("");
  const [listPlace, setListPlace] = useState<any>([]);
  const [open, setOpen] = useState(false);
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

