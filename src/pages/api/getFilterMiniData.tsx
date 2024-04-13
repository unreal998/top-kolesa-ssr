import { getFilterMiniData } from '@/shared/database/sql/sql';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handlerMini(req: NextApiRequest, res: NextApiResponse) {
  getFilterMiniData()
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
}
