import { createRoot } from "react-dom/client";
import { BiStore } from "react-icons/bi";
import { FaCircle } from "react-icons/fa";

const CustomMarker = () => (
  <div style={{ position: "relative", width: "24px", height: "24px" }}>
    <FaCircle
      style={{ position: "absolute", color: "grey", fontSize: "24px" }}
    />
    <BiStore
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

export const getOutletMarker = () => {
  const markerDiv = document.createElement("div");
  const root = createRoot(markerDiv);
  root.render(<CustomMarker />);
  return markerDiv;
};
