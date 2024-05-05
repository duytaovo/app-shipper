import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const markerIcon = require("./mark.png");
const markerIconStart = require("./marker.png");

const CustomMapTracking2 = ({ selectPosition }: any) => {
  const [center, setCenter] = useState({
    latitude: 10.8636778,
    longitude: 106.7397867,
  });
  const mapRef = useRef(null);
  const locationSelection: any = selectPosition
    ? [
        selectPosition.geometry.coordinates[1],
        selectPosition.geometry.coordinates[0],
      ]
    : null;
  const [itemStart, setItemStart] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startData = await AsyncStorage.getItem("start");
        if (startData) {
          const parsedStartData = JSON.parse(startData);
          setItemStart(parsedStartData);
        }
      } catch (error) {
        console.error("Error fetching start data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectPosition && (
          <Marker
            draggable
            coordinate={{
              latitude: locationSelection[0],
              longitude: locationSelection[1],
            }}
            title={`${locationSelection[1]}, ${locationSelection[0]}`}
            // title={`${locationSelection?.title}`}
            image={markerIcon}
          />
        )}
        {itemStart?.geometry?.coordinates.length > 0 && (
          <Marker
            draggable
            coordinate={{
              latitude: itemStart.geometry.coordinates[1],
              longitude: itemStart.geometry.coordinates[0],
            }}
            title={itemStart.properties.name}
            image={markerIconStart}
          />
        )}
        {itemStart?.lat && itemStart?.lng && (
          <Marker
            draggable
            coordinate={{ latitude: itemStart.lat, longitude: itemStart.lng }}
            title={itemStart.display}
            image={markerIconStart}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default CustomMapTracking2;

