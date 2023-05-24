import axios from "axios";

export const createAdmin = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/admins/create`,
    {
      id: data.id,
      employee_firstname: data.employee_firstname,
      employee_lastname: data.employee_lastname,
      email: data.email,
      password: data.password,
      role: data.role,
    }
  );

  return response.data;
};

export const updateAdmin = async (data: Record<string, any>) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/admins/update`,
    {
      id: data.id,
      employee_firstname: data.employee_firstname,
      employee_lastname: data.employee_lastname,
      email: data.email,
      password: data.password,
      role: data.role,
      account_status: data.account_status,
    }
  );

  return response.data;
};

const fetchAdminList = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/admins/list`
  );

  return response.data;
};

const fetchAdminByKeyword = async (keyword: string) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/admins/search`,
    {
      keyword: keyword,
    }
  );

  return response.data;
};

export const fetchTableData = async (keyword: string) => {
  if (keyword === "") {
    return await fetchAdminList();
  } else {
    return await fetchAdminByKeyword(keyword);
  }
};
