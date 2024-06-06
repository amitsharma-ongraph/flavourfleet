import { StoreContext } from "@/context/storeContext";
import { FC, PropsWithChildren, useEffect, useReducer, useState } from "react";
import { Action } from "../../packages/types/common/action";
import { State } from "../../packages/types/common/state";
import { useAuth } from "@/hooks/useAuth";
import { axios } from "../../packages/axios";
import { ICartItem } from "../../packages/types/entity/ICartItem";
import { getUser } from "../../packages/realm/userApp";
import { useNotification } from "@/hooks/useNotification";
import { OrderStatus } from "../../packages/enums/OrderStatus";
import { Address } from "../../packages/types/entity/Address";
import _axios from "axios";

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuth();
  const { setNotification } = useNotification();
  const [locationLoading, setLocationLoading] = useState<boolean>(true);

  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case "setUser":
          return {
            ...state,
            user: action.data,
          };
        case "setModal":
          return {
            ...state,
            modal: action.data,
          };
        case "setModalController":
          return {
            ...state,
            modalController: action.data,
          };
        case "setRestaurant":
          return {
            ...state,
            restaurant: action.data,
          };
        case "setLoadingState": {
          return {
            ...state,
            loadingStates: action.data,
          };
        }
        case "setCart": {
          return {
            ...state,
            cart: action.data,
          };
        }
        case "setOrders":
          return {
            ...state,
            orders: action.data,
          };
        case "setLiveLocation":
          return {
            ...state,
            liveLocation: action.data,
          };
        case "setSelectedLocation":
          return {
            ...state,
            selectedLocation: action.data,
          };
        case "updateOrderStatus": {
          const { orderId, status } = action.data;

          return {
            ...state,
            orders: state.orders.map((order) =>
              order.id === orderId
                ? {
                    ...order,
                    status,
                  }
                : order
            ),
          };
        }
        case "addToCart": {
          const { restaurantId, menuItem } = action.data;
          const newCartItem: ICartItem = { quantity: 1, menuItem };
          const existingCartItems = state.cart[restaurantId] || [];
          const existingCartItem = existingCartItems.find(
            (item) => item.menuItem.id === menuItem.id
          );

          if (existingCartItem) {
            const updatedCartItems = existingCartItems.map((item) =>
              item.menuItem.id === menuItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              ...state,
              cart: {
                ...state.cart,
                [restaurantId]: updatedCartItems,
              },
            };
          } else {
            return {
              ...state,
              cart: {
                ...state.cart,
                [restaurantId]: [...existingCartItems, newCartItem],
              },
            };
          }
        }
        case "removeFromCart": {
          const { restaurantId, menuItemId } = action.data;
          const existingCartItems = state.cart[restaurantId] || [];
          const existingCartItem = existingCartItems.find(
            (item) => item.menuItem.id === menuItemId
          );

          if (existingCartItem) {
            if (existingCartItem.quantity > 1) {
              const updatedCartItems = existingCartItems.map((item) =>
                item.menuItem.id === menuItemId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              );
              return {
                ...state,
                cart: {
                  ...state.cart,
                  [restaurantId]: updatedCartItems,
                },
              };
            } else {
              const updatedCartItems = existingCartItems.filter(
                (item) => item.menuItem.id !== menuItemId
              );
              return {
                ...state,
                cart: {
                  ...state.cart,
                  [restaurantId]: updatedCartItems,
                },
              };
            }
          }
          return state;
        }
        default:
          return state;
      }
    },
    {
      user: undefined,
      modal: null,
      modalController: {
        loading: false,
      },
      loadingStates: {
        formLoading: false,
        appLoading: false,
      },
      cart: {},
      orders: [],
      selectedLocation: null,
      liveLocation: null,
    }
  );

  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          dispatch({
            type: "setUser",
            data: undefined,
          });
        }
        const res = await axios.post("/user/details", {
          id: userId,
        });
        const { data } = res;
        if (data.success) {
          dispatch({
            type: "setUser",
            data: data.user,
          });
        } else {
          dispatch({
            type: "setUser",
            data: undefined,
          });
        }
      } catch (error) {
        dispatch({
          type: "setUser",
          data: undefined,
        });
      }
    })();
  }, [userId]);

  useEffect(() => {
    if (state.user) {
      (async () => {
        try {
          const res = await axios.get("/cart/get");
          const { data } = res;
          if (data.success) {
            dispatch({
              type: "setCart",
              data: data.cart,
            });
          }
        } catch (error) {}
      })();

      (async () => {
        try {
          const res = await axios.get("/order/user/get-all");
          const { data } = res;
          if (data.success) {
            dispatch({
              type: "setOrders",
              data: data.orderList,
            });
          }
        } catch (error) {}
      })();
    }
  }, [state.user]);

  useEffect(() => {
    const setupChangeStream = async () => {
      const user = await getUser();
      const mongo = user.mongoClient("mongodb-atlas");
      const collection = mongo.db("foodOrdering").collection("orders");

      const handleChange = (
        change: Realm.Services.MongoDB.ChangeEvent<any>
      ) => {
        if (
          change.operationType === "update" &&
          state.user.id == change.fullDocument.userId.toString()
        ) {
          dispatch({
            type: "updateOrderStatus",
            data: {
              orderId: change.fullDocument._id.toString(),
              status: change.fullDocument.status,
            },
          });
          const formatedTitle = change.fullDocument.status
            .split("_")
            .reduce((s: string, w: string) => {
              return s + w[0].toUpperCase() + w.substring(1, w.length);
            }, "");

          setNotification({
            type: "success",
            title: `Your Order Is ${formatedTitle}`,
            link: `/profile/orders/track/${change.fullDocument._id}`,
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

    if (state.user) setupChangeStream();
  }, [state.user]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          (async () => {
            try {
              setLocationLoading(true);
              const res = await _axios.get(
                `https://eu1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
              );
              const { data } = res;
              const addresArray = data.display_name.split("_");
              const addressLine = data.display_name
                .split(",")
                .splice(0, 3)
                .reduce((s: string, w: string, i: number) => {
                  if (i == addresArray.length + 1) return s + w;
                  else return s + w + " , ";
                }, "");
              const liveAddress: Address = {
                _id: "id1",
                addressLine,
                city: data.address.city,
                country: data.address.country,
                zipCode: data.address.postcode,
                location: {
                  coordinates: [longitude, latitude],
                },
              };
              dispatch({
                type: "setLiveLocation",
                data: liveAddress,
              });
            } catch (error) {
              setLocationLoading(false);
            }
          })();
        },
        (error: GeolocationPositionError) => {
          setLocationLoading(false);
          console.error("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (state.liveLocation) {
      dispatch({
        type: "setSelectedLocation",
        data: state.liveLocation,
      });
    } else if (!locationLoading && state.user.addressList) {
      dispatch({
        type: "setSelectedLocation",
        data: state.user.addressList[0],
      });
    }
  }, [state.liveLocation, state.user]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
