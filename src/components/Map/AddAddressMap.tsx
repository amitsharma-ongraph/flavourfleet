// components/Map.tsx
import { useEffect, useRef, useState } from "react";
import maplibre, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import MarkerAddress from "./MarkerAddress";
import { FaSearch } from "react-icons/fa";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

const AddAddressMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const centerMarker = useRef<Marker | null>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [centerCoordinate, setCenterCoordinate] = useState<
    [number, number] | null
  >(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [redirectCoords, setRedirectCoords] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (!mapContainer.current) return;
    const initializeMap = () => {
      const mapInstance = new maplibre.Map({
        container: mapContainer.current!,
        style:
          "https://api.maptiler.com/maps/streets-v2/style.json?key=LhXLLEQ6L5AYI7Ai0xdy",
        center: [0, 0],
        zoom: 17,
      });

      mapInstance.on("load", () => {
        setMap(mapInstance);
      });

      return mapInstance;
    };

    const mapInstance = initializeMap();

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (!map) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          setCenterCoordinate([longitude, latitude]);
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    map.on("dragend", (e) => {
      const newCenter = map.getCenter();
      setCenterCoordinate([newCenter.lng, newCenter.lat]);
    });

    map.on("drag", (e) => {
      const mapCenter = map.getCenter();
      if (centerMarker.current) {
        centerMarker.current.setLngLat([mapCenter.lng, mapCenter.lat]);
      } else {
        centerMarker.current = new Marker({ color: "red" })
          .setLngLat([mapCenter.lng, mapCenter.lat])
          .addTo(map);
      }
    });
  }, [map]);

  useEffect(() => {
    if (!userLocation || !map) return;
    map.easeTo({
      center: userLocation,
      zoom: 17,
      duration: 2000,
    });

    new Marker({ color: "blue" }).setLngLat(userLocation).addTo(map);
  }, [userLocation]);

  useEffect(() => {
    if (!map || !redirectCoords) return;
    map.easeTo({
      center: redirectCoords,
      zoom: 14,
      duration: 2000,
    });
    setCenterCoordinate(redirectCoords);
  }, [redirectCoords]);

  return (
    <Box position="relative" width="100vw" height="100vh">
      <Flex
        position="absolute"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        background="white"
        padding={2}
        borderRadius="md"
        boxShadow="md"
        zIndex="10"
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch color="gray.300" />}
          />
          <Input type="text" placeholder="Search location..." />
        </InputGroup>
      </Flex>
      <Box
        ref={mapContainer}
        width="100%"
        height="100%"
        position="absolute"
        top={0}
        left={0}
      />
      {centerCoordinate && (
        <MarkerAddress
          setRedirectCoords={setRedirectCoords}
          coordinates={centerCoordinate}
          userLocation={userLocation}
        />
      )}
    </Box>
  );
};

export default AddAddressMap;
