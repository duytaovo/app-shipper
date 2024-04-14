import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    error: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      error: false,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      error: true,
      coordinates: {
        lat: "",
        lng: "",
      },
    });
  };
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Vị trí không hỗ trợ",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};

export default useGeoLocation;

