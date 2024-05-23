import { IRestroPOrder } from "../entity/IRestroPOrder";
import { Restaurant } from "../entity/Restaurant";

export interface RestroState {
  restaurant: Restaurant | null;
  loading: boolean;
  orders: IRestroPOrder[];
}
