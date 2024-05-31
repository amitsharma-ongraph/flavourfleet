import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useAuth } from "@/hooks/useAuth";
import { axios } from "../../packages/axios";
import { RestroState } from "../../packages/types/common/restroState";
import { RestroAction } from "../../packages/types/common/restroAction";
import { RestroStoreContext } from "@/context/restroStoreContext";
import { getUser } from "../../packages/realm";
import { useNotification } from "@/hooks/useNotification";

export const RestroStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuth();
  const { setNotification } = useNotification();
  const [state, dispatch] = useReducer(
    (state: RestroState, action: RestroAction) => {
      switch (action.type) {
        case "setRestaurant":
          return {
            ...state,
            restaurant: action.data,
          };
        case "setRestroLoading":
          return {
            ...state,
            loading: action.data,
          };
        case "setOrders":
          return {
            ...state,
            orders: action.data,
          };
        case "updateOrderStatus": {
          const { orderId, status, newTimeline } = action.data;

          return {
            ...state,
            orders: state.orders.map((order) =>
              order.id === orderId
                ? {
                    ...order,
                    status,
                    timeline: {
                      ...order.timeline,
                      ...newTimeline,
                    },
                  }
                : order
            ),
          };
        }
        default:
          return state;
      }
    },
    {
      restaurant: null,
      loading: true,
      orders: [],
    }
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/restaurant/available");
        const { data } = res;
        if (data.success == true) {
          dispatch({
            type: "setRestaurant",
            data: {
              ...data.restaurant,
              ownerId: data.restaurant.ownerId._id,
            },
          });

          dispatch({
            type: "setRestroLoading",
            data: false,
          });
        }
      } catch (error) {}
    })();
  }, [userId]);

  useEffect(() => {
    const setupChangeStream = async () => {
      const user = await getUser();
      const mongo = user.mongoClient("mongodb-atlas");
      const collection = mongo.db("foodOrdering").collection("orders");

      const handleChange = (
        change: Realm.Services.MongoDB.ChangeEvent<any>
      ) => {
        if (
          change.operationType === "insert" &&
          state.restaurant._id == change.fullDocument.restroId.toString()
        ) {
          const order = change.fullDocument;
          order.bill._id = order.bill._id.toString();
          order.items.forEach((item: any) => {
            item._id = item._id.toString();
            item.menuItem._id = item.menuItem._id.toString();
          });
          order.restroAddress._id = order.restroAddress._id.toString();
          order.restroId = order.restroId.toString();
          order.id = order._id.toString();

          dispatch({
            type: "setOrders",
            data: [...state.orders, order],
          });

          setNotification({
            type: "success",
            title: "New Order Received",
          });
        }
      };

      try {
        for await (const change of collection.watch()) {
          handleChange(change);
        }
      } catch (error) {
        console.error("Error watching collection:", error);
      }
    };

    if (state.loading === false) setupChangeStream();
  }, [state.loading]);

  useEffect(() => {
    if (state.restaurant) {
      (async () => {
        const res = await axios.get("/order/restaurant/get-all");
        const { data } = res;
        if (data.success) {
          dispatch({
            type: "setOrders",
            data: data.orderList,
          });
        }
      })();
    }
  }, [state.restaurant]);

  return (
    <RestroStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </RestroStoreContext.Provider>
  );
};
