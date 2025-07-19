# 部署指南

本指南介绍如何将订单管理系统部署到生产环境。

## 准备工作

1. **环境变量配置**
   ```bash
   # .env.local (本地开发)
   NEXT_PUBLIC_API_BASE_URL=http://3.93.213.141:8000
   NEXT_PUBLIC_APP_NAME=订单管理系统
   
   # .env.production (生产环境)
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
   NEXT_PUBLIC_APP_NAME=订单管理系统
   ```

2. **构建项目**
   ```bash
   npm run build
   npm run start
   ```

## Vercel 部署

### 方法一：通过 Vercel CLI

1. 安装 Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. 登录 Vercel
   ```bash
   vercel login
   ```

3. 部署项目
   ```bash
   vercel
   ```

4. 配置环境变量
   - 在 Vercel 仪表板中设置环境变量
   - 或通过 CLI：
   ```bash
   vercel env add NEXT_PUBLIC_API_BASE_URL
   vercel env add NEXT_PUBLIC_APP_NAME
   ```

### 方法二：通过 GitHub 集成

1. 将代码推送到 GitHub
2. 在 Vercel 中导入 GitHub 仓库
3. 配置环境变量
4. 部署

## Netlify 部署

1. 构建配置文件 `netlify.toml`：
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. 环境变量配置：
   - 在 Netlify 仪表板设置环境变量

## Docker 部署

1. 创建 `Dockerfile`：
   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY . .
   COPY --from=deps /app/node_modules ./node_modules
   RUN npm run build
   
   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production
   
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S nextjs -u 1001
   
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json
   
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   
   CMD ["npm", "start"]
   ```

2. 构建和运行：
   ```bash
   docker build -t order-management .
   docker run -p 3000:3000 order-management
   ```

## 传统服务器部署

1. 准备服务器（Node.js 18+）
2. 上传代码并安装依赖：
   ```bash
   npm ci --only=production
   npm run build
   ```

3. 使用 PM2 进程管理：
   ```bash
   npm install -g pm2
   pm2 start npm --name "order-management" -- start
   pm2 save
   pm2 startup
   ```

4. 配置 Nginx 反向代理：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 环境变量说明

| 变量名 | 描述 | 必需 | 示例 |
|--------|------|------|------|
| `NEXT_PUBLIC_API_BASE_URL` | 后端API地址 | 是 | `https://api.example.com` |
| `NEXT_PUBLIC_APP_NAME` | 应用名称 | 否 | `订单管理系统` |

## 性能优化

1. **启用压缩**
   ```javascript
   // next.config.js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     compress: true,
     // 其他配置...
   }
   ```

2. **图片优化**
   - 使用 Next.js Image 组件
   - 配置图片域名白名单

3. **缓存策略**
   - 静态资源缓存
   - API 响应缓存

## 监控和日志

1. **错误监控**
   - 集成 Sentry
   - 配置错误报告

2. **性能监控**
   - 使用 Vercel Analytics
   - 或集成其他监控工具

3. **日志记录**
   - 配置日志级别
   - 集中化日志管理

## 安全考虑

1. **HTTPS**
   - 强制使用 HTTPS
   - 配置 SSL 证书

2. **CORS 配置**
   - 配置正确的跨域策略
   - 限制允许的域名

3. **环境变量安全**
   - 不要在前端暴露敏感信息
   - 使用环境变量管理敏感配置

## 故障排除

1. **构建失败**
   - 检查 TypeScript 错误
   - 验证依赖兼容性

2. **运行时错误**
   - 检查环境变量配置
   - 验证 API 连接

3. **性能问题**
   - 分析包大小
   - 优化组件渲染
