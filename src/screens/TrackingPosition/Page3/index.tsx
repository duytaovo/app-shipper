import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import CustomMapTracking3 from "./components/map";

interface RouteResponse {
  paths: {
    distance: number;
    time: number;
    instructions: {
      text: string;
    }[];
  }[];
}

const TrackingOrder3: React.FC = () => {
  const [routeInfo, setRouteInfo] = useState<RouteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [itemStart, setItemStart] = React.useState<any>();
  const [itemEnd, setItemEnd] = React.useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startData = await AsyncStorage.getItem("start");
        const endData = await AsyncStorage.getItem("end");
        if (startData) {
          setItemStart(JSON.parse(startData));
        }
        if (endData) {
          setItemEnd(JSON.parse(endData));
        }
        if (startData && endData) {
          const apiKey = "9c486497752392adc6b3a4156cb889271e83b5e462f4a54f";
          const origin = `${JSON.parse(startData)?.geometry?.coordinates[1]},${
            JSON.parse(startData)?.geometry?.coordinates[0]
          }`;
          const destination = `${
            JSON.parse(endData)?.geometry?.coordinates[1]
          },${JSON.parse(endData)?.geometry?.coordinates[0]}`;
          const response = await axios.get<RouteResponse>(
            `https://maps.vietmap.vn/api/route?api-version=1.1&apikey=${apiKey}&point=${origin}&point=${destination}&vehicle=motorcycle`,
          );
          setRouteInfo(response.data);
          setShowDetails(true);
          setModalVisible(true);
          setError(null);
        }
      } catch (error) {
        setShowDetails(false);
        setError("Failed to fetch route information");
        setModalVisible(false);
      }
    };

    fetchData();
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const renderItem = ({ item }: { item: { text: string } }) => (
    <Text style={styles.instructionText}>{item.text}</Text>
  );
  const minutesToHoursAndMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours} giờ ${remainingMinutes} phút`;
    }
    return `${remainingMinutes} phút`;
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <CustomMapTracking3 />
      </View>
      <View style={styles.drawerContainer}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => {
            setModalVisible(true);
            toggleDetails();
          }}
        >
          <Ionicons name={"ios-arrow-up"} size={24} color="#007bff" />
        </TouchableOpacity>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.boldText}>
          Từ: {itemStart?.properties?.name || itemStart?.display}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.boldText}>
          Đến: {itemEnd?.properties?.name || itemEnd?.display}
        </Text>
        {routeInfo && (
          <View>
            <Text style={styles.boldText}>
              Khoảng cách: {Math.round(routeInfo.paths[0]?.distance / 1000)} km
            </Text>
            <Text style={styles.boldText}>
              Thời gian ước tính:{" "}
              {minutesToHoursAndMinutes(
                Math.round(routeInfo.paths[0]?.time / 60000),
              )}
            </Text>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            toggleDetails();
          }}
        >
          <View style={[styles.modalContainer]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(false);
                toggleDetails();
              }}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={24}
                color="#007bff"
              />
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.boldText}
            >
              Từ: {itemStart?.properties?.name || itemStart?.display}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.boldText}
            >
              Đến: {itemEnd?.properties?.name || itemEnd?.display}
            </Text>
            {routeInfo && !error && showDetails && (
              <View style={styles.detailsContainer}>
                <Text style={styles.boldText}>
                  Khoảng cách: {Math.round(routeInfo.paths[0]?.distance / 1000)}{" "}
                  km
                </Text>
                <Text style={styles.boldText}>
                  Thời gian ước tính:{" "}
                  {minutesToHoursAndMinutes(
                    Math.round(routeInfo.paths[0]?.time / 60000),
                  )}
                </Text>
                <Text style={styles.boldText}>Chỉ dẫn:</Text>
                <ScrollView
                  style={{ maxHeight: Dimensions.get("window").height * 0.8 }}
                >
                  <FlatList
                    data={routeInfo.paths[0]?.instructions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </ScrollView>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    paddingTop: 1,
  },
  drawerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  toggleButton: {
    alignSelf: "flex-end",
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  closeButton: {
    marginTop: 35,
    alignSelf: "flex-end",
    padding: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  detailsContainer: {
    marginTop: 8,
  },
  instructionText: {
    paddingVertical: 2,
    fontSize: 16,
    marginBottom: 4,
  },
  boldText: {
    paddingVertical: 2,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default TrackingOrder3;

