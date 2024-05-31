// components/OrderTrackingMap.tsx
import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import maplibre, {
  Map as MapLibreMap,
  GeoJSONSourceSpecification,
  Marker,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { axios } from "../../../packages/axios";
import { getLiveMarker } from "./markers/LiveMarker";
import { getOutletMarker } from "./markers/OutletMarker";
import { getHomeMarker } from "./markers/HomeMarker";

interface ITrackingInfo {
  totalPoints: number;
  waypoints: [number, number][];
  index: number;
  _id: string;
}

const OrderTrackingMap: FC<{ trackingInfo: ITrackingInfo }> = ({
  trackingInfo,
}) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapLibreMap | null>(null);
  const { waypoints, index, totalPoints, _id: id } = trackingInfo;
  const [liveIndex, setLiveIndex] = useState<number>(index);
  const marker = useRef<Marker | null>(null);

  const getUpdatedGeoJSON = (
    coords: [number, number][]
  ): GeoJSONSourceSpecification => ({
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coords,
      },
      properties: {},
    },
  });

  const centerCoords = (): [number, number] => {
    const lastIndex = waypoints.length - 1;
    const lon: number = (waypoints[0][0] + waypoints[lastIndex][0]) / 2;
    const lat: number = (waypoints[0][1] + waypoints[lastIndex][1]) / 2;
    return [lon, lat];
  };

  const animateMarker = (
    marker: MutableRefObject<Marker | null>,
    start: [number, number],
    end: [number, number]
  ) => {
    let startTime: number | null = null;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / 3000, 1);

      const lng = start[0] + (end[0] - start[0]) * progress;
      const lat = start[1] + (end[1] - start[1]) * progress;
      if (marker.current) marker.current.setLngLat([lng, lat]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = () => {
      const mapInstance = new maplibre.Map({
        container: mapContainer.current!,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPLIBRE_API_KEY}`,
        center: centerCoords(),
        zoom: 14,
      });

      mapInstance.on("load", () => {
        setMap(mapInstance);

        mapInstance.addSource("travelled", getUpdatedGeoJSON([]));

        mapInstance.addLayer({
          id: "travelled",
          type: "line",
          source: "travelled",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "grey",
            "line-width": 4,
          },
        });

        mapInstance.addSource("remaining", getUpdatedGeoJSON(waypoints));
        mapInstance.addLayer({
          id: "remaining",
          type: "line",
          source: "remaining",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ff0000",
            "line-width": 4,
          },
        });

        new Marker({
          color: "red",
          element: getOutletMarker(),
        })
          .setLngLat(waypoints[0])
          .addTo(mapInstance);

        new Marker({
          color: "red",
          element: getHomeMarker(),
        })
          .setLngLat(waypoints[totalPoints - 1])
          .addTo(mapInstance);

        if (marker.current) {
          marker.current.setLngLat(waypoints[liveIndex]);
        } else {
          marker.current = new Marker({
            color: "red",
            element: getLiveMarker(),
          })
            .setLngLat(waypoints[liveIndex])
            .addTo(mapInstance);
        }
      });

      return mapInstance;
    };

    const mapInstance = initializeMap();

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (!map) return;

    const updateLayers = () => {
      const remainingArray = waypoints.slice(liveIndex);
      const travelledArray = waypoints.slice(0, liveIndex + 1);

      const travelledSource = map.getSource(
        "travelled"
      ) as maplibre.GeoJSONSource;
      const remainingSource = map.getSource(
        "remaining"
      ) as maplibre.GeoJSONSource;

      travelledSource.setData({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: travelledArray,
        },
        properties: {},
      });

      remainingSource.setData({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: remainingArray,
        },
        properties: {},
      });
    };

    updateLayers();

    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get(`/order/livePosition/${id}`);
        const { data } = res;
        setLiveIndex(data.liveIndex);
      } catch (error) {
        console.error("Error fetching live position:", error);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [map, liveIndex]);

  useEffect(() => {
    if (!map) return;
    if (marker.current) {
      animateMarker(marker, waypoints[liveIndex - 1], waypoints[liveIndex]);
    } else {
      marker.current = new Marker({ color: "red" })
        .setLngLat(waypoints[liveIndex])
        .addTo(map);
    }
  }, [liveIndex]);
  return <div style={{ width: "100%", height: "100%" }} ref={mapContainer} />;
};

export default OrderTrackingMap;
