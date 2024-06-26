import React from "react";
import { View, Text } from "react-native";
import CustomMapHistory from "../map"; // Giả sử CustomMapHistory là một thành phần React Native đã được triển khai
import Address from "../Address";

const SwipeableEdgeDrawer = () => {
  const [selectPosition, setSelectPosition] = React.useState(null);

  return (
    <View style={{ flex: 1 }}>
      {/* map */}
      <View style={{ paddingTop: 1 }}>
        <CustomMapHistory selectPosition={selectPosition} />
      </View>
      {/* Swipeable Drawer */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
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

export default SwipeableEdgeDrawer;

