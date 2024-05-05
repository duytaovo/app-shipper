import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";

const markerIcon = require("./marker.png");
function ResetCenterView({ selectPosition, mapRef }: any) {
  useEffect(() => {
    if (selectPosition) {
      mapRef.current.animateToRegion({
        latitude: selectPosition.geometry.coordinates[1],
        longitude: selectPosition.geometry.coordinates[0],
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [selectPosition]);

  return null;
}

const CustomMapHistory = ({ selectPosition }: any) => {
  const mapRef = useRef(null);

  const locationSelection: any = selectPosition?.geometry
    ? {
        latitude: selectPosition.geometry.coordinates[1],
        longitude: selectPosition.geometry.coordinates[0],
      }
    : null;

  return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        // showsUserLocation
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 10.8636778,
          longitude: 106.7397867,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectPosition && (
          <Marker
            coordinate={locationSelection}
            title={`${locationSelection.title}`}
            image={markerIcon}
          />
        )}
        <ResetCenterView selectPosition={selectPosition} mapRef={mapRef} />
      </MapView>
    </View>
  );
};

export default CustomMapHistory;

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

