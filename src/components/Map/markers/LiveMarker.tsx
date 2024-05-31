import { createRoot } from "react-dom/client";
import { FaCircle, FaMapMarkerAlt, FaMotorcycle } from "react-icons/fa";

const CustomMarker = () => (
  <div style={{ position: "relative", width: "24px", height: "24px" }}>
    <FaCircle
      style={{ position: "absolute", color: "red", fontSize: "24px" }}
    />
    <FaMotorcycle
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

export const getLiveMarker = () => {
  const markerDiv = document.createElement("div");
  const root = createRoot(markerDiv);
  root.render(<CustomMarker />);
  return markerDiv;
};
