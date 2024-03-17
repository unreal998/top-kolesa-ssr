import { ReactNode } from 'react';

export type SliderItem = {
  imgSource: string;
  description: ReactNode;
  hoverDescription?: ReactNode;
};

export type CartItemData = CartStorageData & {
  name: string;
  image: string;
  article: number;
  fullName: string;
  price: number;
};

export type UserData = {
  address: string;
  city: string;
  phone: string;
  userName: string;
  email: string;
  comment: string;
  paymentType: string;
};

export type CheckoutItemData = CartItemData & ShopItemAPI;

export type ShopItemAPI = {
  // THAT IS THE ID
  id: number;
  brand: string;
  country: string;
  diametr: string;
  height: number;
  width: string;
  season: string;
  speed: string;
  weight: string;
  name: string;
  rate: number;
  year: number;
  price_uah: number;
  image_file: string;
  brand_id: number;
  size_id: number;
  supplier_id: number;
  param: string; // studded
  in_stock: number;
};

export type CartStorageData = {
  numberOfTires: number;
  tireId: number;
};
