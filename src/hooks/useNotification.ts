import { useContext } from "react";
import { useRouter } from "next/router";
import { NotificationContext } from "@/context/notficationContext";
import { Notification } from "../../packages/types/common/Notification";

interface Returns {
  setNotification: (notification: Notification) => void;
}

export const useNotification = (): Returns => {
  const { push } = useRouter();
  const { setNotification: __setNotification } =
    useContext(NotificationContext);

  return {
    setNotification(notification) {
      __setNotification(notification);
      if (notification?.path) {
        push(notification.path, notification.pathAs);
      }
    },
  };
};
