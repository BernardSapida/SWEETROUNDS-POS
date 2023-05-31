import axios from "axios";

export const updateAccountStatus = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/users/update_account_status`,
    {
      id: data.id,
      account_status: data.account_status,
    }
  );

  return response.data;
};
