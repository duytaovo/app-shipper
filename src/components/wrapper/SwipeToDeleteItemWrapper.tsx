import React, { useRef } from "react";
import { Animated, PanResponder, View } from "react-native";

import { useAppDispatch } from "../../hooks/useRedux";
import { openDialog } from "../../redux/slice/dialogSlice";

interface IProps {
  product: any;
  children: React.ReactNode;
}
const SwipeToDeleteItemWrapper: React.FC<IProps> = ({ product, children }) => {
  const dispatch = useAppDispatch();
  const pan = useRef(new Animated.ValueXY()).current;

  const handleRemoveProduct = () => {};

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x }]),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          // Khi vuốt sang trái đủ khoảng cách xóa, thực hiện hành động xóa
          handleRemoveProduct();
        } else {
          // Khi vuốt không đủ khoảng cách xóa, hoặc vuốt sang phải, reset vị trí
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }],
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default SwipeToDeleteItemWrapper;

