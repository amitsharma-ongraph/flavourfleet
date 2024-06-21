import { AuthContext } from "@/context/authContext";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { axios } from "../../packages/axios";
import _axios from "axios"
import { useRouter } from "next/router";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const {push}=useRouter();
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
        // await _axios.post("/api/login",{
        //   message:"request body",
        //   cookies:data.cookies
        // }) 
        
        setUserId(data.userId);
        push("/")
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
