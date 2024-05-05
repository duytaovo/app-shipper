import React, { useState } from "react";
import { View, Text } from "react-native";
import CustomMapTracking1 from "./components/map";
import SearchBox1 from "./components/map/SearchBox";

const TrackingOrder1: React.FC = () => {
  const [selectPosition, setSelectPosition] = React.useState(null);

  return (
    <View style={{ flex: 1 }}>
      {/* map */}
      <View style={{ paddingTop: 1 }}>
        <CustomMapTracking1 selectPosition={selectPosition} />
      </View>
      {/* Swipeable Drawer */}
      <View style={{ position: "absolute", bottom: 15, left: 5, right: 5 }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 21,
            borderTopRightRadius: 21,
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "black", opacity: 0.7 }}>
              Nhập vị trí của bạn
            </Text>
          </View>
          <View style={{ marginTop: 6 }}>
            <SearchBox1 setSelectPosition={setSelectPosition} width={300} />
          </View>
        </View>
        <View
          style={{
            width: 30,
            height: 6,
            borderRadius: 3,
            position: "absolute",
            top: 8,
          }}
        />
      </View>
    </View>
  );
};

export default TrackingOrder1;

