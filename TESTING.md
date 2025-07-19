# 测试用户凭据

以下是一些测试用的用户凭据（需要根据实际API的用户数据调整）：

## 测试用户1
- 用户名: admin
- 密码: admin123

## 测试用户2  
- 用户名: user1
- 密码: password123

## 测试用户3
- 用户名: test
- 密码: test123

## API测试

你可以使用以下命令测试API连接：

```bash
# 测试登录API
curl -X POST "http://3.93.213.141:8000/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=admin123"

# 测试获取订单列表（需要先登录获取token）
curl -X GET "http://3.93.213.141:8000/orders" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 功能测试步骤

1. **登录测试**
   - 访问 http://localhost:3000
   - 会自动重定向到登录页面
   - 使用测试凭据登录

2. **创建订单测试**
   - 登录成功后在仪表板创建订单
   - 填写测试数据：
     - 客户名称: 张三
     - 产品名称: iPhone 15
     - 数量: 1
     - 单价: 5999.00

3. **订单列表测试**
   - 查看创建的订单是否显示在列表中
   - 测试分页功能
   - 测试筛选功能

4. **认证测试**
   - 测试退出登录
   - 测试未登录时访问仪表板（应该重定向到登录页）
