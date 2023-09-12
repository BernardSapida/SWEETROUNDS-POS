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
    `${process.env.NEXT_SERVER_URL}/api/v1/settings/read.php`
  );

  const data = response.data;

  res.status(200).json(data);
}
