'use client';

import React, { useState } from 'react';
import { CreateOrderRequest } from '@/types/order';
import { orderService } from '@/services/orderService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface CreateOrderProps {
  onOrderCreated?: () => void;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ onOrderCreated }) => {
  const [formData, setFormData] = useState<CreateOrderRequest>({
    customer_name: '',
    product_name: '',
    quantity: 1,
    unit_price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Form validation
    if (!formData.customer_name.trim()) {
      setError('Please enter customer name');
      setLoading(false);
      return;
    }
    if (!formData.product_name.trim()) {
      setError('Please enter product name');
      setLoading(false);
      return;
    }
    if (formData.quantity <= 0) {
      setError('Quantity must be greater than 0');
      setLoading(false);
      return;
    }
    if (formData.unit_price <= 0) {
      setError('Unit price must be greater than 0');
      setLoading(false);
      return;
    }

    try {
      await orderService.createOrder(formData);
      setSuccess('Order created successfully!');
      
      // Reset form
      setFormData({
        customer_name: '',
        product_name: '',
        quantity: 1,
        unit_price: 0,
      });

      // Notify parent component to refresh order list
      if (onOrderCreated) {
        onOrderCreated();
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create order, please try again');
      console.error('Error creating order:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = formData.quantity * formData.unit_price;

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customer_name">Customer Name *</Label>
            <Input
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleInputChange}
              placeholder="Enter customer name"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product_name">Product Name *</Label>
            <Input
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit_price">Unit Price ($) *</Label>
            <Input
              id="unit_price"
              name="unit_price"
              type="number"
              value={formData.unit_price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Total Amount Display */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-foreground">${totalAmount.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* 错误和成功消息 */}
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle className="h-4 w-4" />
            {success}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner size="sm" text="Creating..." />
          ) : (
            'Create Order'
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateOrder;
