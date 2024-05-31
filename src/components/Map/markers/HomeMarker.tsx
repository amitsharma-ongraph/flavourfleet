import { createRoot } from "react-dom/client";
import { FaCircle, FaHome, FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";

const CustomMarker = () => (
  <div style={{ position: "relative", width: "24px", height: "24px" }}>
    <FaCircle
      style={{ position: "absolute", color: "red", fontSize: "24px" }}
    />
    <FaHome
      style={{
        position: "absolute",
        color: "white",
        fontSize: "12px",
        left: "6px",
        top: "6px",
      }}
    />
  </div>
);

export const getHomeMarker = () => {
  const markerDiv = document.createElement("div");
  const root = createRoot(markerDiv);
  root.render(<CustomMarker />);
  return markerDiv;
};
