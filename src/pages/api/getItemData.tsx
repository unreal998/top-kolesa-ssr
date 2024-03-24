import { getItemData } from "@/shared/database/sql/sql";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    getItemData().then(data => {
        res.send(JSON.stringify(data))
    }).catch(err => {
        console.log(err);
        res.send(err);
    });
}