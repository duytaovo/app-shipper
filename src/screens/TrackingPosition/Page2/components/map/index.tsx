import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getTokenFromStore } from "../../../../../utils/storage";
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
const CustomMapHistory = ({ selectPosition }: any) => {
  const [center, setCenter] = useState({ lat: 10.8636778, lng: 106.7397867 });
  const ZOOM_LEVEL = 9;
  const mapRef: any = useRef();
  const locationSelection: any = [
    selectPosition?.geometry.coordinates[1],
    selectPosition?.geometry.coordinates[0],
  ];
  const [itemStart, setItemStart] = React.useState<any>();

  // console.log(JSON.parse(data));
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
      {selectPosition && (
        <Marker position={locationSelection} icon={markerIcon}>
          <Popup>
            <b>
              {locationSelection[1]}, {locationSelection[0]}
            </b>
          </Popup>
        </Marker>
      )}
      {itemStart?.geometry?.coordinates.length > 0 && (
        <Marker
          position={[
            itemStart?.geometry?.coordinates[1],
            itemStart?.geometry?.coordinates[0],
          ]}
          icon={markerIconStart}
        >
          <Popup>
            <b>{itemStart?.properties?.name}</b>
          </Popup>
        </Marker>
      )}
      {itemStart?.lat && itemStart?.lng && (
        <Marker
          position={[itemStart?.lat, itemStart?.lng]}
          icon={markerIconStart}
        >
          <Popup>
            <b>{itemStart?.display}</b>
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};

export default CustomMapHistory;

