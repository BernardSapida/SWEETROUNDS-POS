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
  const { id, order_status, payment_status } = req.body;

  const response = await axios.post(
    `${process.env.NEXT_SERVER_URL}/api/v1/orders/update_status.php`,
    { id: id, order_status: order_status, payment_status: payment_status }
  );

  const data = response.data;

  res.status(200).json(data);
}
