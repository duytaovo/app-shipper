import { StyleSheet } from "react-native";
import { colorPalletter } from "../../assets/theme/color";

export function createStyle() {
  return StyleSheet.create({
    container: {
      display: "flex",
      // flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 24,
      paddingVertical: 24,
      justifyContent: "center",
    },
    input: {
      marginBottom: 5,
    },
    btnSubmit: {
      backgroundColor: colorPalletter.lime[500],
      marginBottom: 8,
    },
    box: {
      marginBottom: 10,
    },
  });
}

