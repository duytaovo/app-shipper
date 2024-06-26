import React from "react";
import { Image, StyleSheet } from "react-native";

import { SliderIProps } from "../../../../types/slider";
import SwiperWrapper from "../../../../components/wrapper/SwiperWrapper";

interface IProps {
  data: SliderIProps[];
}
const SwiperSlide: React.FC<IProps> = ({ data }) => {
  return (
    <SwiperWrapper>
      {data?.map((slider: any, index) => (
        <Image
          source={slider?.image}
          key={index}
          style={styles.item}
          alt="image-slider"
          accessibilityLabel={`slider-${index}`}
        />
      ))}
    </SwiperWrapper>
  );
};

const styles = StyleSheet.create<any>({
  item: {
    flex: 1,
  },
});
export default SwiperSlide;

