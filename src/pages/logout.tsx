import { useUser } from "@/hooks/useUser";
import React, { useEffect } from "react";

function Logout() {
  const { logOut } = useUser();
  useEffect(() => {
    logOut();
  }, []);
  return <></>;
}

export default Logout;
