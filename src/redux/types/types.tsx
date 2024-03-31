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
