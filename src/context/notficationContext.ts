import { createContext, type Dispatch, type SetStateAction } from "react";
import { Nullable } from "../../packages/types/common/nullable";
import { Notification } from "../../packages/types/common/Notification";

export const NotificationContext = createContext<{
  notification: Nullable<Notification>;
  setNotification: Dispatch<SetStateAction<Nullable<Notification>>>;
}>(null as any);
