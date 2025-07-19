# 订单管理系统

这是一个基于 Next.js 开发的订单管理系统，具有用户认证和订单管理功能。

## 功能特性

- 🔐 用户登录认证
- 📦 创建订单
- 📋 订单列表查看
- 🔍 订单筛选和搜索
- 📄 订单分页显示
- 🎨 响应式设计

## 技术栈

- **前端框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **HTTP客户端**: Axios
- **状态管理**: React Context API

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── dashboard/         # 仪表板页面
│   ├── login/            # 登录页面
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 首页
│   └── not-found.tsx     # 404页面
├── components/            # React 组件
│   ├── CreateOrder.tsx   # 创建订单组件
│   └── OrderList.tsx     # 订单列表组件
├── contexts/             # React Context
│   └── AuthContext.tsx   # 认证上下文
├── lib/                  # 工具库
│   └── api.ts            # API配置
├── services/             # API服务
│   ├── authService.ts    # 认证服务
│   └── orderService.ts   # 订单服务
└── types/                # TypeScript 类型定义
    ├── auth.ts           # 认证相关类型
    └── order.ts          # 订单相关类型
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件并配置以下变量：

```env
NEXT_PUBLIC_API_BASE_URL=http://3.93.213.141:8000
NEXT_PUBLIC_APP_NAME=订单管理系统
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 打开浏览器

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## API 接口说明

本应用连接到后端API服务 `http://3.93.213.141:8000`，使用以下主要接口：

### 认证接口
- `POST /token` - 用户登录
- `GET /users/me` - 获取当前用户信息

### 订单接口
- `POST /orders` - 创建订单
- `GET /orders` - 获取订单列表（支持分页和筛选）
- `GET /orders/{id}` - 获取单个订单详情
- `PATCH /orders/{id}/status` - 更新订单状态
- `DELETE /orders/{id}` - 删除订单

## 使用说明

### 1. 登录
- 在登录页面输入用户名和密码
- 成功登录后会自动跳转到仪表板

### 2. 创建订单
- 在仪表板的"创建新订单"区域填写订单信息
- 包括客户名称、产品名称、数量和单价
- 系统会自动计算总金额
- 点击"创建订单"按钮提交

### 3. 查看订单
- 订单列表显示所有订单信息
- 支持按客户名称和订单状态筛选
- 支持分页浏览
- 可以调整每页显示数量

### 4. 订单状态
- **待处理**: 新创建的订单
- **已确认**: 已确认的订单
- **已发货**: 已发货的订单
- **已交付**: 已完成交付的订单
- **已取消**: 已取消的订单

## 开发相关

### 构建项目

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 类型检查

```bash
npm run type-check
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

### 其他平台

确保配置正确的环境变量，特别是 `NEXT_PUBLIC_API_BASE_URL`。

## 注意事项

1. **跨域问题**: 如果遇到CORS错误，需要后端API配置允许前端域名的跨域请求
2. **认证令牌**: 登录后的token存储在localStorage中，页面刷新时会自动恢复登录状态
3. **错误处理**: 应用包含完善的错误处理机制，网络错误和API错误都会有相应提示

## 故障排除

### 常见问题

1. **无法登录**
   - 检查API服务是否正常运行
   - 验证用户名和密码是否正确
   - 查看浏览器控制台的错误信息

2. **订单列表空白**
   - 确认已成功登录
   - 检查API接口是否返回正确数据
   - 查看网络请求是否成功

3. **样式问题**
   - 确保Tailwind CSS正确配置
   - 检查CSS是否正确加载

## 贡献

欢迎提交问题和功能请求！

## 许可证

MIT License
