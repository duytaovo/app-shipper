import React from "react";

import ListCarHistory from "./components/ListCarHistory"; // Giả sử SwipeableEdgeDrawer được đổi tên thành ListCarHistory trong React Native
import { View } from "react-native";

const BookACarMobilePage3: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ListCarHistory />
      </View>
    </View>
  );
};

export default BookACarMobilePage3;

