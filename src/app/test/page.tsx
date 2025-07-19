import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function TestPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Shadcn/UI 组件测试</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>按钮测试</CardTitle>
        </CardHeader>
        <CardContent className="space-x-2">
          <Button>默认按钮</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="destructive">危险按钮</Button>
          <Button variant="secondary">次要按钮</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>表单组件测试</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="test-input">测试输入框</Label>
            <Input id="test-input" placeholder="请输入内容" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>徽章测试</CardTitle>
        </CardHeader>
        <CardContent className="space-x-2">
          <Badge>默认</Badge>
          <Badge variant="secondary">次要</Badge>
          <Badge variant="outline">轮廓</Badge>
          <Badge variant="destructive">危险</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>表格测试</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">金额</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">测试订单 1</TableCell>
                <TableCell><Badge variant="default">已确认</Badge></TableCell>
                <TableCell className="text-right">¥100.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">测试订单 2</TableCell>
                <TableCell><Badge variant="secondary">待处理</Badge></TableCell>
                <TableCell className="text-right">¥200.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
