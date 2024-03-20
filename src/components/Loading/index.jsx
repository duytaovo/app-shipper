import React, { useMemo } from "react";
import { Box, Spinner } from "native-base";
import { createStyles } from "./style";
import { colorPalletter } from "../../assets/theme/color";

const LoadingComponent = () => {
  const styles = useMemo(() => {
    return createStyles();
  });

  return (
    <Box style={styles.container}>
      <Spinner size="lg" color={colorPalletter.lime[500]} />
    </Box>
  );
};

export default LoadingComponent;

