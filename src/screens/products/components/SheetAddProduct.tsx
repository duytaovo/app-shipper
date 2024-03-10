import { Divider } from "@rneui/themed";
import React, { useState } from "react";
import uuid from "react-native-uuid";

import { useAppDispatch } from "../../../hooks/useRedux";
import { ProductIProps } from "../../../types/product";
import SheetWrapper from "../../../components/wrapper/SheetWrapper";
import { Text } from "native-base";

interface IProps {
  isOpen: boolean;
  handleCloseSheet: () => void;
  product: ProductIProps;
}
const SheetAddProduct: React.FC<IProps> = ({
  isOpen,
  handleCloseSheet,
  product,
}) => {
  const dispatch = useAppDispatch();

  return (
    <SheetWrapper isOpen={isOpen}>
      <Text>test</Text>
    </SheetWrapper>
  );
};

export default SheetAddProduct;
