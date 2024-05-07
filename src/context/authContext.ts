import { createContext } from "react";
import { IAuthContext } from "../../packages/types/context/IAuthContext";

export const AuthContext = createContext<IAuthContext>({
  userId: null,
  reset: () => null,
});
