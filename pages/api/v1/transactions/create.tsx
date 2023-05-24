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
  const {
    items,
    donut_quantity,
    note,
    tax,
    discount,
    total,
    admin_id,
    invoice_id,
  } = req.body;

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/transactions/create.php`,
    {
      invoice_id: invoice_id,
      items: items,
      donut_quantity: donut_quantity,
      note: note,
      tax: tax,
      discount: discount,
      total: total,
      admin_id: admin_id,
    }
  );

  const data = response.data;

  res.status(200).json(data);
}
