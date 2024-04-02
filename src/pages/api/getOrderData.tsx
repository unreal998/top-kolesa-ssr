import { getOrderContentData, getOrderData } from '@/shared/database/sql/sql';
import { NextApiRequest, NextApiResponse } from 'next';

function unifiyOrderItemsData(orderContent: OrderContentResponceDto[]) {
  let totalAmount = 0;
  const itemsList = orderContent.map((item) => {
    totalAmount += item.price_buy;
    return {
      price: item.price_buy,
      brand: item.brand,
      name: item.name,
      size: item.size,
      count: item.quantity,
    };
  });
  return { itemsList, totalAmount };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const query = req.query;
  if (!query.id || typeof query.id !== 'string') {
    res.send('Missing order ID');
    return;
  }
  const orderDataResponce = await getOrderData(query.id).catch((err) => {
    res.send(err);
  });

  const orderData = (orderDataResponce as OrderDataResponceDto[])[0];
  const orderContent = await getOrderContentData(query.id).catch((err) => {
    res.send(err);
  });
  const { itemsList, totalAmount } = unifiyOrderItemsData(
    orderContent as OrderContentResponceDto[],
  );
  const responceData = {
    orderId: orderData.id,
    userName: orderData.name,
    userEmail: orderData.email,
    orderComment: orderData.comment,
    deliveryAddress: orderData.address_city + ' ' + orderData.address,
    phoneNumber: orderData.phone,
    orderTime: orderData.created_at,
    itemsList,
    totalAmount,
  };
  res.send(responceData);
}
