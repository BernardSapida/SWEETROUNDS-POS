export interface Order {
  name?: string;
  image?: string;
  flavor?: string;
  quantity?: number;
  price?: number;
  total?: number;

  id?: number;
  order_number?: string;
  firstname?: string;
  lastname?: string;
  tax?: number;
  shipping_fee?: number;
  discount?: number;
  note?: string;
  order_status?: string;
  payment_status?: string;

  product_number?: string;
  total_quantity?: number;

  availability?: string;
  addres_line_1?: string;
  addres_line_2?: string;
  city?: string;
  contact?: string;
  user_id?: number;
}
