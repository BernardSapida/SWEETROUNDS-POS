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
  const { year, month } = req.body;
  const response = await axios.post(
    `${process.env.NEXT_SERVER_URL}/api/v1/reports/donut/sold/online/month.php`,
    {
      year: year,
      month: month,
    }
  );
  const data = response.data;

  res.status(200).json(data);
}
