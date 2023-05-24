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
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/reports/customers/new.php`
  );

  const data = response.data;

  res.status(200).json(data);
}
