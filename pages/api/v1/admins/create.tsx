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
  const { id, employee_firstname, employee_lastname, email, password, role } =
    req.body;

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins/create.php`,
    {
      id: id,
      employee_firstname: employee_firstname,
      employee_lastname: employee_lastname,
      email: email,
      password: password,
      role: role,
    }
  );

  const data = response.data;

  res.status(200).json(data);
}
