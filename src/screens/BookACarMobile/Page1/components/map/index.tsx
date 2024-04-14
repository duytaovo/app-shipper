import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const markerIcon = new L.Icon({
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
          selectPosition?.geometry.coordinates[1],
          selectPosition?.geometry.coordinates[0],
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
  console.log(selectPosition)
  const [center, setCenter] = useState({ lat: 10.8636778, lng: 106.7397867 });
  const ZOOM_LEVEL = 9;
  const mapRef: any = useRef();
  const locationSelection: any = selectPosition?.geometry
    ? [
        selectPosition.geometry.coordinates[1],
        selectPosition.geometry.coordinates[0],
      ]
    : null;

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
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};

export default CustomMapHistory;

