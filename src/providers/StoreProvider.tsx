import { StoreContext } from "@/context/storeContext";
import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { Action } from "../../packages/types/common/action";
import { State } from "../../packages/types/common/state";
import { useAuth } from "@/hooks/useAuth";
import { axios } from "../../packages/axios";
import { ICartItem } from "../../packages/types/entity/ICartItem";

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { userId } = useAuth();

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

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
