# Order Management System

A modern order management system built with Next.js, featuring user authentication and comprehensive order management capabilities.

## Features

- 🔐 User authentication and login
- 📦 Create new orders
- 📋 View order lists
- 🔍 Filter and search orders
- 📄 Paginated order display
- 🎨 Responsive design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript  
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI + Radix UI
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Authentication**: JWT with automatic token refresh

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Dashboard page
│   ├── login/            # Login page
│   ├── test/             # Test page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── not-found.tsx     # 404 page
│   ├── globals.css       # Global styles
│   └── favicon.ico       # Favicon
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   │   ├── badge.tsx     # Badge component
│   │   ├── button.tsx    # Button component
│   │   ├── card.tsx      # Card component
│   │   ├── form.tsx      # Form components
│   │   ├── input.tsx     # Input component
│   │   ├── label.tsx     # Label component
│   │   ├── select.tsx    # Select component
│   │   └── table.tsx     # Table component
│   ├── CreateOrder.tsx   # Create order component
│   ├── OrderList.tsx     # Order list component
│   ├── ErrorBoundary.tsx # Error boundary component
│   └── LoadingSpinner.tsx # Loading spinner component
├── contexts/             # React Context
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utility libraries
│   └── api.ts            # API configuration
├── services/             # API services
│   ├── authService.ts    # Authentication service
│   └── orderService.ts   # Order service
└── types/                # TypeScript type definitions
    ├── auth.ts           # Authentication types
    └── order.ts          # Order types
```

**Additional Configuration Files:**
- `components.json` - Shadcn/UI configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration
- `Dockerfile` - Docker configuration
- `.github/workflows/ci-cd.yml` - CI/CD pipeline
- `DEPLOYMENT.md` - Deployment guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file and configure the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://3.93.213.141:8000
NEXT_PUBLIC_APP_NAME=Order Management
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open Browser

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## API Documentation

This application connects to the backend API service at `http://3.93.213.141:8000`, using the following main endpoints:

### Authentication Endpoints
- `POST /auth/login` - User login
- `GET /users/me` - Get current user information

### Order Endpoints
- `POST /orders` - Create new order
- `GET /orders` - Get order list (supports pagination and filtering)
- `GET /orders/{id}` - Get single order details
- `PATCH /orders/{id}/status` - Update order status
- `DELETE /orders/{id}` - Delete order

## Usage Guide

### 1. Login
- Enter username and password on the login page
- After successful login, you'll be automatically redirected to the dashboard

### 2. Create Orders
- Fill in order information in the "Create New Order" section on the dashboard
- Include customer name, product name, quantity, and unit price
- The system will automatically calculate the total amount
- Click "Create Order" button to submit

### 3. View Orders
- The order list displays all order information
- Filter by customer name and order status
- Browse with pagination support
- Adjust the number of items displayed per page

### 4. Order Status
- **Pending**: Newly created orders
- **Confirmed**: Confirmed orders
- **Shipped**: Shipped orders
- **Delivered**: Successfully delivered orders
- **Cancelled**: Cancelled orders

## Development

### Build Project

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Code Linting

```bash
npm run lint
```

### Type Checking

```bash
npm run type-check
```

## Deployment

### Docker Deployment

The project includes Docker support for containerized deployment:

```bash
# Build Docker image
docker build -t nextjs-order-management .

# Run container
docker run -p 3000:3000 nextjs-order-management
```

### AWS EC2 with CI/CD

This project includes a complete CI/CD pipeline for AWS deployment:

1. **Setup**: Follow the `DEPLOYMENT.md` guide for AWS configuration
2. **Auto Deploy**: Push to `main` branch for production, `develop` for staging
3. **Manual Deploy**: Use GitHub Actions workflow dispatch

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

Make sure to configure the correct environment variables, especially `NEXT_PUBLIC_API_BASE_URL`.

## Important Notes

1. **CORS Issues**: If you encounter CORS errors, the backend API needs to be configured to allow cross-origin requests from the frontend domain
2. **Authentication Token**: The login token is stored in localStorage and will automatically restore login state on page refresh with automatic token refresh
3. **Error Handling**: The application includes comprehensive error handling with ErrorBoundary components for both network errors and API errors
4. **UI Components**: Uses Shadcn/UI for consistent, accessible, and customizable components
5. **Docker Support**: Includes production-ready Dockerfile with multi-stage builds for optimized container size

## Project Files

- **`DEPLOYMENT.md`**: Complete deployment guide for AWS EC2 with CI/CD
- **`TESTING.md`**: Testing documentation and guidelines  
- **`components.json`**: Shadcn/UI configuration for component generation
- **`.github/workflows/ci-cd.yml`**: GitHub Actions CI/CD pipeline
- **`Dockerfile`**: Multi-stage Docker build configuration

## Troubleshooting

### Common Issues

1. **Cannot Login**
   - Check if the API service is running normally
   - Verify username and password are correct
   - Check browser console for error messages

2. **Empty Order List**
   - Confirm successful login
   - Check if API endpoints return correct data
   - Verify network requests are successful

3. **Styling Issues**
   - Ensure Tailwind CSS v4 is configured correctly
   - Check if CSS is loading properly
   - Verify Shadcn/UI components are properly imported

4. **Build Errors**
   - Run `npm run type-check` to identify TypeScript errors
   - Check for missing dependencies with `npm install`
   - Verify environment variables are properly set

5. **Docker Build Issues**
   - Ensure Docker is installed and running
   - If you get "Cannot find module 'typescript'" error, the Dockerfile has been updated to include dev dependencies
   - For permission issues, check that Docker has access to the project directory

## Additional Resources

- 📖 **Deployment Guide**: See `DEPLOYMENT.md` for complete AWS deployment instructions
- 🧪 **Testing Guide**: See `TESTING.md` for testing setup and guidelines
- 🎨 **UI Components**: Built with [Shadcn/UI](https://ui.shadcn.com/) for modern, accessible components
- 🐳 **Docker**: Production-ready containerization with multi-stage builds

## Contributing

Welcome to submit issues and feature requests!

## License

MIT License
