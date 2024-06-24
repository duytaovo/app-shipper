import { Text, View } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
type Props = {
  labels: string[];
  datasets: [{ data: number[] }];
  chartConfig?: {};
  style?: {};
  yAxisLabel?: "$";
  yAxisSuffix?: "k";
};

const ChartKit = ({ labels, datasets, chartConfig, style,yAxisLabel,yAxisSuffix }: Props) => {
  return (
    <View>
      <Text>Doanh thu tháng</Text>
      <LineChart
        data={{
          labels: labels,
          datasets: datasets,
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#F31559",
          backgroundGradientFrom: "#00DFA2",
          backgroundGradientTo: "#59D5E0",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#FF0060`,
          labelColor: (opacity = 1) => `#FF0060`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default ChartKit;

