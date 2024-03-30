import { getShopData } from "@/shared/database/sql/sql";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    getShopData(query).then(data => {
        res.send(data)
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
}