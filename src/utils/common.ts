const formatCurrency: any = {
  style: "currency",
  currency: "VND",
};
export const formatCurrencyVietnam = (amount: number): string => {
  amount = amount * 1000;
  return amount.toLocaleString("vi-VN", formatCurrency);
};

export const formatSellNumber = (sellNumber: number) => {
  return sellNumber < 1000 ? sellNumber : `${(sellNumber / 1000).toFixed(1)}k`;
};

export const getPercentReduce = (price: number, originalPrice: number) => {
  return Math.round((1 - price / originalPrice) * 100);
};

export const payloadCreator =
  (asyncFunc: any) => async (arg: any, thunkAPI: any) => {
    try {
      const res = await asyncFunc(arg);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  };

