import { AdminStoreContext } from "@/context/adminStoreContext";
import { useContext } from "react";

export const useAdminStore = () => useContext(AdminStoreContext);
