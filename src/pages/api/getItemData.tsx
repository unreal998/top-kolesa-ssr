import { getItemData } from '@/shared/database/sql/sql';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  if (query.id) {
    getItemData(query.id as string)
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
  } else {
    res.send('Missing ID!');
  }

}
