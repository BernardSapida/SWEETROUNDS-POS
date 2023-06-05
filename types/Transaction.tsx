export interface Transaction {
  id?: number;
  product_number?: string;
  image?: string;
  flavor?: string;
  name?: string;
  quantity?: number;
  price?: number;

  invoice_id?: string;
  note?: string;
  tax?: number;
  discount?: number;
  total?: number;
  admin_id?: number;
  created_at?: string;
}
