import { StyleSheet, Dimensions } from "react-native";

const WINDOW_WIDTH = Dimensions.get("window").width;

export function createStyles() {
  return StyleSheet.create({
    container: {
      backgroundColor: "white",
    },
    parentBox: {
      width: WINDOW_WIDTH * 0.95,
      height: WINDOW_WIDTH * 0.5,
      marginLeft: WINDOW_WIDTH * 0.025,
      marginTop: 16,
      borderRadius: 20,
      display: "flex",
    },
    parentBoxBackground: {
      width: WINDOW_WIDTH * 0.95,
      height: WINDOW_WIDTH * 0.5,
      borderRadius: 20,
      display: "flex",
    },
    rowContainer: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      backgroundColor: "white",
      width: WINDOW_WIDTH * 0.27,
      height: WINDOW_WIDTH * 0.39,
      borderRadius: 15,
      paddingLeft: 8,
    },
    boxCenter: {
      marginLeft: 8,
      marginRight: 8,
    },
  });
}

