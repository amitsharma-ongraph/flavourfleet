// components/Map.tsx
import { useEffect, useRef, useState } from "react";
import maplibre, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import MarkerAddress from "./MarkerAddress";
import { FaSearch } from "react-icons/fa";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { CiGps } from "react-icons/ci";

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

  const handleCurrentLocation = () => {
    if (map && userLocation) {
      map.easeTo({
        center: userLocation,
        zoom: 17,
        duration: 2000,
      });
      setCenterCoordinate(userLocation);
      if (centerMarker.current) {
        centerMarker.current.setLngLat(userLocation);
      }
    }
  };
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
        <Flex
          position="absolute"
          bottom={0}
          left={0}
          zIndex="10"
          w={"100vw"}
          justifyContent={"center"}
          alignItems={"center"}
          rowGap={4}
          flexDirection={"column"}
        >
          <Flex
            h={"40px"}
            borderRadius={"20px"}
            bg={"white"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            px={4}
            columnGap={4}
            color={"brand.900"}
            cursor={"pointer"}
            fontWeight={600}
            onClick={handleCurrentLocation}
          >
            <Icon as={CiGps} fontSize={"1.2em"}></Icon>
            <Text>Use My Current Location</Text>
          </Flex>
          <MarkerAddress coordinates={centerCoordinate} />
        </Flex>
      )}
    </Box>
  );
};

export default AddAddressMap;
