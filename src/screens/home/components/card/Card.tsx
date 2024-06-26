import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// import Sell from "../Sell";
import styles from "./Card.style";
import { ROUTES } from "../../../../constants";
import MyCustomImage from "../../../../components/shared/MyCustomImage";
import { formatSellNumber } from "../../../../utils/common";

interface IProps {
  product: any;
  horizontal?: boolean;
  border?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CardProduct: React.FC<IProps> = ({
  product,
  horizontal = false,
  border,
  style,
}) => {
  const navigation = useNavigation<any>();

  const handleNavigateItemScreen = () => {
    navigation.navigate(ROUTES.product, { id: product?._id });
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigateItemScreen()}
      style={[styles.wrapper(horizontal), style]}
    >
      <View style={styles.productWrapper(border)}>
        <View style={styles.productSell}>
          {/* <Sell
            price={product?.price}
            originalPrice={product?.original_price}
          /> */}
        </View>
        <View style={styles.productImageWrapper}>
          <MyCustomImage url={product?.images[0]} style={styles.productImage} />
        </View>

        <View style={{ padding: 10, paddingTop: 20 }}>
          <Text numberOfLines={2} style={styles.productText}>
            {product?.name}
          </Text>

          <View style={styles.productBottom}>
            <Text numberOfLines={1} style={styles.productPrice}>
              {/* {formatCurrencyVietnam(product?.price)} */}
            </Text>
            <Text numberOfLines={1} style={styles.productSellNumber}>
              Đã bán {formatSellNumber(product?.sell_number)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardProduct;

