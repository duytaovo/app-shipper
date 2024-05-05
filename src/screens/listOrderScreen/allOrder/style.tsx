import { StyleSheet, Dimensions } from "react-native";
import { colorPalletter } from "../../../assets/theme/color";
import { COLORS } from "../../../constants";

const WINDOW_HEIGHT = Dimensions.get("window").height;

export function createStyles() {
  return StyleSheet.create({
    container: {
      // paddingHorizontal: 16,
      // backgroundColor: "white",
      flex: 1,
      height: WINDOW_HEIGHT,
      overflow: "scroll",
    },
    addrBtnSection: {
      display: "flex",
      // flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      height: 20,
      marginTop: 8,
      marginBottom: 8,
    },
    addrBtnText: {
      color: colorPalletter.warmGray[800],
      fontSize: 12,
    },
    listOrderItem: {
      borderWidth: 1,
      borderColor: colorPalletter.gray[300],
      padding: 16,
      marginBottom: 16,
      display: "flex",
      // flexDirection: "row",
      justifyContent: "space-between",
    },
    listOrderItemTextPhone: {
      color: colorPalletter.amber[500],
      fontWeight: "bold",
    },
    wrapper: {
      // flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    inputWrapper: {
      // flex: 1,
      borderWidth: 0.5,
      borderColor: COLORS.gray,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white,
      height: 30,
    },
    iconCamera: {
      paddingLeft: 0,
      paddingRight: 10,
    },
    iconSearch: {
      padding: 10,
      marginHorizontal: 0,
      borderWidth: 1,
      borderColor: COLORS.primary,
      backgroundColor: COLORS.primary,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    btnReject: {
      color: "black",
      fontSize: 15,
      backgroundColor: colorPalletter.red[600],
    },
  });
}

