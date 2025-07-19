'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import OrderList from '@/components/OrderList';
import CreateOrder from '@/components/CreateOrder';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Plus, List } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  React.useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleOrderCreated = () => {
    // 触发订单列表刷新
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-foreground">Order Management System</h1>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Welcome, {user.username}</span>
              <Button
                onClick={handleLogout}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Create Order Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateOrder onOrderCreated={handleOrderCreated} />
            </CardContent>
          </Card>

          {/* Orders List Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <List className="h-5 w-5" />
                Order List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrderList key={refreshTrigger} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
