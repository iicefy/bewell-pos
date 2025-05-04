import { Product } from "./product";

export interface CartItem extends Product {
  isSendAfter: boolean;
  amount: number;
  amountSendAfter: number;
  discount: DiscountType;
  discountSendAfter: DiscountType;
}

export interface DiscountType {
  code: string;
  amount: number;
}

export type Summary = {
  price: number;
  priceOfVAT: number;
  point: number;
  summaryPrice: number;
  amountItems: number;
};
