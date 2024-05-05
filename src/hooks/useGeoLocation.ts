import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    error: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (position: any) => {
    setLocation({
      loaded: true,
      error: false,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    });
  };

  const onError = () => {
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
    const getLocationAsync = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Permission to access location was denied");
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        onSuccess(currentLocation);
      } catch (error) {
        onError();
      }
    };

    getLocationAsync();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return location;
};

export default useGeoLocation;

