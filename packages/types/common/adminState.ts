import { Restaurant } from "../entity/Restaurant";

export interface AdminState {
  restaurants: Restaurant[] | null;
  loading: boolean;
}
