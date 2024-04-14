import React from "react";
import { View } from "react-native";
import ListCarHistory from "./components/ListCarHistory"; // Giả sử SwipeableEdgeDrawer được đổi tên thành ListCarHistory trong React Native

const BookACarMobilePage1: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ListCarHistory />
      </View>
    </View>
  );
};

export default BookACarMobilePage1;

