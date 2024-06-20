import { AuthContext } from "@/context/authContext";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { axios } from "../../packages/axios";
import _axios from "axios"

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const reset = () => {
    authenticate();
    return null;
  };
  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    try {
      const res = await axios.get("/auth/authenticate");
      const data = res.data;
      if (data.success) {
        await _axios.get("/api/login") 
        setUserId(data.userId);
      } else {
        setUserId(null);
      }
    } catch (error) {
      setUserId(null);
    }
  };
  return (
    <AuthContext.Provider {...{ value: { userId, reset } }}>
      {children}
    </AuthContext.Provider>
  );
};
