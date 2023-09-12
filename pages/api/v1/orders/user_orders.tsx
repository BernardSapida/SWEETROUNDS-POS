// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  sucess: string;
  message: string;
  data: Array<number | string | Array<any>>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { user_id, order_id } = req.body;

  const response = await axios.post(
    `${process.env.NEXTAUTH_URL}/api/v1/orders/user_orders.php`,
    { user_id: user_id, order_id: order_id }
  );

  const data = response.data;

  res.status(200).json(data);
}
