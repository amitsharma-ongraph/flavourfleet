import { StoreContext } from "@/context/storeContext";
import { useContext } from "react";

export const useStore = () => useContext(StoreContext);
