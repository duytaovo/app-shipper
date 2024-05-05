import React, { useState } from "react";
import { View, Text } from "react-native";
import CustomMapTracking2 from "./components/map";
import Address from "./components/Address";

const TrackingOrder2: React.FC = () => {
  const [selectPosition, setSelectPosition] = React.useState(null);

  return (
    <View style={{ flex: 1 }}>
      {/* map */}
      <View style={{ paddingTop: 1 }}>
        <CustomMapTracking2 selectPosition={selectPosition} />
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
          <View style={{ marginTop: 6 }}>
            <Address
              selectPosition={selectPosition}
              setSelectPosition={setSelectPosition}
            />
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

export default TrackingOrder2;

