import apiClient from '@/lib/api';
import { Order, CreateOrderRequest, OrdersResponse, OrderQueryParams } from '@/types/order';

export const orderService = {
  // 创建订单
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  // 获取订单列表（分页）
  async getOrders(params: OrderQueryParams = {}): Promise<OrdersResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('page_size', params.per_page.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.customer_name) queryParams.append('customer_name', params.customer_name);

    const response = await apiClient.get(`/orders?${queryParams.toString()}`);
    return response.data;
  },

  // 获取单个订单详情
  async getOrderById(id: number): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  // 更新订单状态
  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const response = await apiClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  },

  // 删除订单
  async deleteOrder(id: number): Promise<void> {
    await apiClient.delete(`/orders/${id}`);
  },
};
