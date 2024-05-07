import { useUser } from "@/hooks/useUser";
import React, { useEffect } from "react";

function logout() {
  const { logOut } = useUser();
  useEffect(() => {
    logOut();
  }, []);
  return <></>;
}

export default logout;
