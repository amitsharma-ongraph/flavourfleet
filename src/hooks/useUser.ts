import { useRouter } from "next/router";
import { User } from "../../packages/types/entity/User";
import { useStore } from "./useStore";
import { axios } from "../../packages/axios";
import { useNotification } from "./useNotification";
import { useAuth } from "./useAuth";

interface ISignUpCredentials {
  name: string;
  email: string;
  contactNo: string;
  password: string;
  confirmPassword: string;
}

interface IUseUserReturns {
  user: User | null | undefined;
  userLoaded: boolean;
  logInWithEmailPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailPassword: (credentials: ISignUpCredentials) => Promise<void>;
  logOut: () => void;
  continueWithGoogle: () => void;
  authenticate: () => void;
}

export const useUser = (): IUseUserReturns => {
  const { state } = useStore();
  const { replace } = useRouter();
  const { setNotification } = useNotification();
  const { reset } = useAuth();

  return {
    user: state.user,
    userLoaded: state.user ? true : false,

    logInWithEmailPassword: async (email, password) => {
      try {
        const res = await axios.post("/auth/login", {
          username: email,
          password,
        });
        const { data } = res;

        if (data.success) {
          reset();
          setNotification({
            type: "success",
            title: "Login succesfull",
            path: "/",
          });
        } else {
          setNotification({
            type: "error",
            title: data.message,
          });
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
    signUpWithEmailPassword: async (credentials) => {
      const { name, email, contactNo, password, confirmPassword } = credentials;
      if (!name || !email || !contactNo || !password || !confirmPassword) {
        setNotification({
          type: "error",
          title: "missing credentials",
        });
        return;
      }
      if (password !== confirmPassword) {
        setNotification({
          type: "error",
          title: "Passwords does't match",
        });
        return;
      }
      try {
        const res = await axios.post("/auth/signup", {
          name,
          email,
          contactNo,
          password,
        });
        const { data } = res;
        if (data.success) {
          setNotification({
            type: "success",
            title: "SignUp Successfull",
            path: "/login",
          });
          return;
        } else {
          setNotification({
            type: "error",
            title: data.message,
          });
          return;
        }
      } catch (error) {
        setNotification({
          type: "error",
          title: "Error while singing up",
        });
      }
    },

    continueWithGoogle: () => {
      window.open(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`,
        "_self"
      );
    },

    logOut: async () => {
      try {
        const res = await axios.get("/auth/logout");
        const { data } = res;
        if (data.success) {
          reset();
          setNotification({
            type: "success",
            title: "Logout succesfull",
            path: "/",
          });
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },

    authenticate: async () => {
      const res = await axios.get("auth/authenticate");

      const { data } = res;
      if (!data.success) {
        setNotification({
          type: "error",
          title: "Please Login Again",
          path: "/login",
        });
      }
    },
  };
};
