import { useStore } from "./useStore";

interface IUseCartReturns {}

export const useCart = (): IUseCartReturns => {
  const {
    state: { cart },
  } = useStore();

  return {};
};
