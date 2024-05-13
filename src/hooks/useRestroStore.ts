import { RestroStoreContext } from "@/context/restroStoreContext";
import { useContext } from "react";

export const useRestroStore = () => useContext(RestroStoreContext);
