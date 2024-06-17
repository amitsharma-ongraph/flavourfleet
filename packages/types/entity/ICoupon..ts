import { DiscountCondition } from "../../enums/DiscountCondition";
import { DiscountType } from "../../enums/DiscountType";

export interface ICoupon {
  _id?: string;
  restroId: string;
  code: string;
  redemptions?: number;
  type: DiscountType;
  discount?: number;
  giftItemId?: string;
  condition: DiscountCondition;
  billAmount?: number;
  combination?: string[];
  activated: boolean;
  isPublic: boolean;
  upto?: number;
  limited: Boolean;
  availed?: number;
}
