import { Product } from "./product";

export interface CartItem extends Product {
  isSendAfter: boolean;
  amount: number;
  amountSendAfter: number;
  disCount: DiscountType;
  disCountSendAfter: DiscountType;
}

export interface DiscountType {
  code: string;
  amount: number;
}
