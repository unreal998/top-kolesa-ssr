import { ReactNode } from 'react';

export type SliderItem = {
  imgSource: string;
  description: ReactNode;
  hoverDescription?: ReactNode;
};

export type FilterParamsResponce = {
  width: string[];
  diametr: string[];
  height: string[];
  speed: string[];
  weight: string[];
  brands: string[];
  prices: number[];
  vechileType: string[];
};

export type FilterParamsResponceMini = {
  width: string[];
  diametr: string[];
  height: string[];
  brands: string[];
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

export type OrderItemProps = {
  brandId: number;
  modelId: number;
  sizeId: number;
  userId: number;
  statusId: number;
  customerId: number;
  locationId: number;
  supplierId: number;
  paymentId: number;
  paymentCost: string;
  cityId: number;
  paymentStatusId: number;
  shipCompId: number;
  paymentCostType: number;
  paymentComment: string;
  shipmentId: number;
  shipmentCost: string;
  shipmentCostType: number;
  driverId: number;
  shipmentComment: string;
  shipmentCompId: number;
  driverCost: number;
  driverCostType: number;
  otherCost: number;
  otherCostType: number;
  otherCostName: string;
  discount: number;
  sellSum: number;
  profit: number;
  nameFirm: string;
  name: string;
  tireName: string;
  phone: string;
  phoneIndex: string;
  prepay: number;
  country: string;
  year: number;
  inWarehous: number;
  email: string;
  addressCity: string;
  address: string;
  shipment: string;
  productType: string;
  brand: string;
  size: string;
  quantity: number;
  priceBuy: number;
  priceSell: number;
  createdAt: string;
  updatedAt: string;
  shipmentFrom: string;
  shipmentUntil: string;
  comment: string;
  source: string;
  referer: string;
  forPrint: number;
  forExport: number;
  checkNum: number;
  checkDate: string;
  checkPayer: string;
  paymentType: string;
  politicsCheckBox: number;
  smsText: string;
  smsSendAt: string;
};

export const PRODUCT_TYPE = {
  TIRE: 'TIRE',
  DISK: 'DISK',
};

export type CityListData = {
  Present: string;
  MainDescription: string;
  Area: string;
  Region: string;
};

export type AutocompleateData = {
  title: string;
};

export type CityListResponceData = {
  TotalCount: number;
  Addresses: CityListData[];
};

type WarehouseData = {
  Description: string;
};

export type CityListResponce = {
  data: CityListResponceData[];
};

export type WarehouseListResponce = {
  data: WarehouseData[];
};

export type BuyItemResponce = {
  orderId: number;
};

type OrderItem = {
  brand: string;
  name: string;
  size: string;
  price: number;
  count: number;
};

export type OrderData = {
  orderId: number;
  userName: string;
  totalAmount: number;
  userEmail: string;
  deliveryAddress: string;
  orderTime: string;
  phoneNumber: string;
  orderComment: string;
  itemsList: OrderItem[];
};

// DTO
export type TireSizesDto = {
  width: string[];
  diametr: string[];
  height: string[];
  speed: string[];
  weight: string[];
  brands: string[];
  prices: number[];
};
export type TireSizesMiniDto = {
  width: string[];
  diametr: string[];
  height: string[];
  brands: string[];
};

export type TireSizesDataResponceDto = {
  width: string;
  diametr: string;
  height: string;
  speed: string;
  weight: string;
  brand: string;
  price_uah: number;
};

export type OrderItemsListDto = {
  price: string;
  brand: string;
  name: string;
  size: string;
  count: string;
};

export type OrderContentResponceDto = {
  price_buy: number;
  brand: string;
  name: string;
  size: string;
  quantity: string;
};

export type OrderDataResponceDto = {
  id: number;
  name: string;
  email: string;
  comment: string;
  address_city: string;
  address: string;
  phone: string;
  created_at: string;
  totalAmount: number;
  itemsList: OrderItemsListDto[];
};

export type OrderItemDto = {
  brandId: number;
  modelId: number;
  sizeId: number;
  userId: number;
  statusId: number;
  customerId: number;
  locationId: number;
  supplierId: number;
  paymentId: number;
  paymentCost: string;
  cityId: number;
  paymentStatusId: number;
  shipCompId: number;
  paymentCostType: number;
  paymentComment: string;
  shipmentId: number;
  shipmentCost: string;
  shipmentCostType: number;
  driverId: number;
  shipmentComment: string;
  shipmentCompId: number;
  driverCost: number;
  driverCostType: number;
  otherCost: number;
  otherCostType: number;
  otherCostName: string;
  discount: number;
  sellSum: number;
  profit: number;
  nameFirm: string;
  name: string;
  tireName: string;
  phone: string;
  phoneIndex: string;
  prepay: number;
  country: string;
  year: number;
  inWarehous: number;
  email: string;
  addressCity: string;
  address: string;
  shipment: string;
  productType: string;
  brand: string;
  size: string;
  quantity: number;
  priceBuy: number;
  priceSell: number;
  createdAt: string;
  updatedAt: string;
  shipmentFrom: string;
  shipmentUntil: string;
  comment: string;
  source: string;
  referer: string;
  forPrint: number;
  forExport: number;
  checkNum: number;
  checkDate: string;
  checkPayer: string;
  paymentType: string;
  politicsCheckBox: number;
  smsText: string;
  smsSendAt: string;
};

export type ShopDataRequestDto = {
  price?: string;
  diametr?: string;
  profile?: string;
  width?: string;
  season?: string;
  brand?: string;
  studded?: string;
  vechileType?: string;
};
