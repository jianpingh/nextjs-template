export interface Order {
  id: number;
  customer_name: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at?: string;
}

export interface CreateOrderRequest {
  customer_name: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface OrderQueryParams {
  page?: number;
  per_page?: number;
  status?: string;
  customer_name?: string;
}
