import { createOrder } from '@/shared/database/sql/sql';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  createOrder(body)
    .then((data) => {
      res.send({ orderId: data });
    })
    .catch((err) => {
      res.send(err);
    });
}
