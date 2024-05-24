// components/Map.tsx
import { useEffect, useRef, useState } from "react";
import maplibre, { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
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
        zoom: 2,
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

          // Set the map center to the user's location
          map.setCenter([longitude, latitude]);
          map.setZoom(17);

          // Add a marker to the map at the user's location
          new Marker().setLngLat([longitude, latitude]).addTo(map);
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
  }, [map]);

  return <div style={{ width: "800px", height: "800px" }} ref={mapContainer} />;
};

export default Map;
