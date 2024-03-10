import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import FontWrapper from "../../components/wrapper/FontWrapper";
import { COLORS } from "../../constants";
import { useAppSelector } from "../../hooks/useRedux";
import SwipeToDeleteItemWrapper from "../../components/wrapper/SwipeToDeleteItemWrapper";
import BottomCheckCart from "./components/BottomCheckCart";
import Item from "./components/Item";
import Empty from "./components/Empty";

const CartScreen: React.FC = () => {
  const products = useAppSelector((state) => state.cart.products);

  return (
    <FontWrapper>
      <ScrollView scrollEventThrottle={16} style={styles.wrapper}>
        <View style={styles.container}>
          {products.length > 0 ? (
            products.map((product) => (
              <SwipeToDeleteItemWrapper
                key={`product-${product._id}`}
                product={product}
              >
                <Item key={`product-${product._id}`} product={product} />
              </SwipeToDeleteItemWrapper>
            ))
          ) : (
            <Empty />
          )}
        </View>
      </ScrollView>

      {products.length > 0 && <BottomCheckCart products={products} />}
    </FontWrapper>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    position: "relative",
  },
});

export default CartScreen;
