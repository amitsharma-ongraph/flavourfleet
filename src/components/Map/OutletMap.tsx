// components/Map.tsx
import { FC, useEffect, useRef, useState } from "react";
import maplibre, { LngLatLike, Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Address } from "../../../packages/types/entity/Address";

const OutletMap: FC<{
  outlets: Address[];
  selectedCoordinates: {
    longitude: string;
    latitude: string;
  } | null;
}> = ({ outlets, selectedCoordinates }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const getInitialCoords = (): LngLatLike | undefined => {
      if (!outlets[0]) return [0, 0];
      const longitude=outlets[0].location.coordinates[0]
      const latitude=outlets[0].location.coordinates[1];
      if (!longitude || !latitude) return [0, 0];
      const lon = parseFloat(longitude);
      const lat = parseFloat(latitude);
      return [lon, lat];
    };
    const initializeMap = () => {
      const mapInstance = new maplibre.Map({
        container: mapContainer.current!,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_API_KEY}`,
        center: getInitialCoords(),
        zoom: 12,
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
    outlets.forEach((outlet) => {
      const longitude=outlet.location.coordinates[0];
      const latitude=outlet.location.coordinates[1];
      if (longitude && latitude) {
        new Marker()
          .setLngLat([parseFloat(longitude), parseFloat(latitude)])
          .addTo(map);
      }
    });
  }, [map]);

  useEffect(() => {
    if (!map || !selectedCoordinates) return;
    map.easeTo({
      center: [
        parseFloat(selectedCoordinates.longitude),
        parseFloat(selectedCoordinates.latitude),
      ],
      zoom: 16,
      duration: 2000,
    });
  }, [selectedCoordinates]);

  return <div style={{ width: "800px", height: "800px" }} ref={mapContainer} />;
};

export default OutletMap;
