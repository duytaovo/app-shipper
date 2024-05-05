import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

const markerIcon = require("./mark.png");
const markerIconStart = require("./marker.png");

const CustomMapTracking3 = () => {
  const [center, setCenter] = useState({
    latitude: 10.8636778,
    longitude: 106.7397867,
  });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef(null);
  const [itemStart, setItemStart] = useState<any>(null);
  const [itemEnd, setItemEnd] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startData = await AsyncStorage.getItem("start");
        if (startData) {
          setItemStart(JSON.parse(startData));
        }

        const endData = await AsyncStorage.getItem("end");
        if (endData) {
          setItemEnd(JSON.parse(endData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pointB = itemEnd
    ? [itemEnd.geometry.coordinates[1], itemEnd.geometry.coordinates[0]]
    : null;

  return (
    <View style={styles.container}>
      <MapView
        maxZoomLevel={20}
        minZoomLevel={0}
        zoomEnabled={true}
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {itemStart && itemStart.geometry && itemStart.geometry.coordinates && (
          <Marker
            coordinate={{
              latitude: itemStart.geometry.coordinates[1],
              longitude: itemStart.geometry.coordinates[0],
            }}
            image={markerIconStart}
          >
            <Callout>
              <View>
                <Text>{itemStart.properties.name}</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {itemEnd && itemEnd.geometry && itemEnd.geometry.coordinates && (
          <Marker
            coordinate={{
              latitude: itemEnd.geometry.coordinates[1],
              longitude: itemEnd.geometry.coordinates[0],
            }}
            image={markerIcon}
          >
            <Callout>
              <View>
                <Text>{itemEnd.properties.name}</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {pointB && (
          <Polyline
            coordinates={[
              {
                latitude: itemStart.geometry.coordinates[1],
                longitude: itemStart.geometry.coordinates[0],
              },
              {
                latitude: pointB[0],
                longitude: pointB[1],
              },
            ]}
            strokeColor="#f00"
            strokeWidth={3}
          />
        )}
        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="black"
          strokeWidth={5}
        /> */}
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

export default CustomMapTracking3;

