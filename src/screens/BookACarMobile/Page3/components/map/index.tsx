import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AsyncStorage from "@react-native-async-storage/async-storage";

const markerIcon = new L.Icon({
  iconUrl: require("./mark.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
const markerIconStart = new L.Icon({
  iconUrl: require("./marker.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});
function ResetCenterView(props: any) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(
          selectPosition?.geometry?.coordinates[1],
          selectPosition?.geometry?.coordinates[0],
        ),
        map.getZoom(),
        {
          animate: true,
        },
      );
    }
  }, [selectPosition]);

  return null;
}
const CustomMapHistory = () => {
  const [center, setCenter] = useState({ lat: 10.8636778, lng: 106.7397867 });
  const ZOOM_LEVEL = 9;
  const mapRef: any = useRef();
  const [itemStart, setItemStart] = React.useState<any>();
  const [itemEnd, setItemEnd] = React.useState<any>();

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
        if (startData && endData) {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pointB = [
    itemEnd?.geometry?.coordinates[1],
    itemEnd?.geometry?.coordinates[0],
  ];

  return (
    <MapContainer
      center={center}
      zoom={ZOOM_LEVEL}
      ref={mapRef}
      style={{ height: "600px", width: "100%", position: "unset" }}
    >
      <TileLayer
        url={osm.maptiler.url}
        attribution={osm.maptiler.attribution}
      />

      {itemStart && itemStart.geometry && itemStart.geometry.coordinates && (
        <>
          <Marker
            position={[
              itemStart?.geometry.coordinates[1],
              itemStart?.geometry.coordinates[0],
            ]}
            icon={markerIconStart}
          >
            <Popup>
              <b>{itemStart.properties.name}</b>
            </Popup>
          </Marker>

          {itemEnd && itemEnd?.geometry && itemEnd.geometry.coordinates && (
            <>
              <Marker
                position={[
                  itemEnd?.geometry.coordinates[1],
                  itemEnd?.geometry.coordinates[0],
                ]}
                icon={markerIcon}
              >
                <Popup>
                  <b>{itemEnd.properties.name}</b>
                </Popup>
              </Marker>

              <Polyline
                positions={[
                  [
                    itemStart?.geometry?.coordinates[1],
                    itemStart?.geometry?.coordinates[0],
                  ],
                  pointB,
                ]}
                color="red"
              />
            </>
          )}
        </>
      )}

      <ResetCenterView selectPosition={itemStart} />
    </MapContainer>
  );
};

export default CustomMapHistory;

