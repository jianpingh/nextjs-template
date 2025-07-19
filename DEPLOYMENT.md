# Deployment Guide

This guide covers how to deploy the Next.js Order Management System to AWS EC2 using the automated CI/CD pipeline.

## Prerequisites

### 1. AWS Setup

#### ECR Repository
Create an ECR repository in your AWS account:
```bash
aws ecr create-repository --repository-name nextjs-order-management --region us-east-1
```

#### EC2 Instances
Set up EC2 instances for each environment (dev, staging, production):
- Ubuntu 20.04 LTS or later
- t3.micro or larger
- Security group allowing HTTP (80), HTTPS (443), and SSH (22)
- Docker installed
- AWS CLI installed

#### Install Docker on EC2:
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ubuntu
```

#### Install AWS CLI on EC2:
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 2. GitHub Secrets Configuration

Add the following secrets to your GitHub repository:
- **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

#### Required Secrets:
```
AWS_ACCESS_KEY_ID         # AWS IAM user access key
AWS_SECRET_ACCESS_KEY     # AWS IAM user secret key
AWS_REGION               # AWS region (e.g., us-east-1)

# Development Environment
DEV_EC2_HOST             # Development EC2 public IP
DEV_EC2_USER             # EC2 user (usually 'ubuntu')
DEV_EC2_PRIVATE_KEY      # Private SSH key for dev EC2

# Staging Environment
STAGING_EC2_HOST         # Staging EC2 public IP
STAGING_EC2_USER         # EC2 user (usually 'ubuntu')
STAGING_EC2_PRIVATE_KEY  # Private SSH key for staging EC2

# Production Environment
PROD_EC2_HOST            # Production EC2 public IP
PROD_EC2_USER            # EC2 user (usually 'ubuntu')
PROD_EC2_PRIVATE_KEY     # Private SSH key for production EC2
```

### 3. IAM Permissions

Create an IAM user with the following permissions:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:BatchCheckLayerAvailability",
                "ecr:GetDownloadUrlForLayer",
                "ecr:GetRepositoryPolicy",
                "ecr:DescribeRepositories",
                "ecr:ListImages",
                "ecr:DescribeImages",
                "ecr:BatchGetImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:PutImage"
            ],
            "Resource": "*"
        }
    ]
}
```

## Deployment Process

### Automatic Deployment
The CI/CD pipeline automatically deploys when:
- **Development**: Push to any branch
- **Staging**: Push to `develop` branch
- **Production**: Push to `main` branch

### Manual Deployment
You can also trigger deployment manually:
1. Go to **Actions** tab in GitHub
2. Select **CI/CD Pipeline**
3. Click **Run workflow**
4. Choose branch and environment

## Pipeline Stages

### 1. Build & Test
- Sets up Node.js 20
- Installs dependencies
- Runs build process
- Executes tests (if any)

### 2. Docker Build & Push
- Builds Docker image
- Tags with commit SHA and environment
- Pushes to AWS ECR

### 3. Deploy to EC2
- Connects to EC2 via SSH
- Pulls latest image from ECR
- Stops old container
- Starts new container
- Performs health check

## Environment Variables

### Application Environment Variables
Create `.env.local` files for each environment on EC2:

```bash
# /home/ubuntu/.env.production
NEXT_PUBLIC_API_BASE_URL=http://3.93.213.141:8000
NODE_ENV=production
```

### Docker Run Command
The pipeline uses this command to run the container:
```bash
docker run -d --name nextjs-app -p 80:3000 --env-file /home/ubuntu/.env.production $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
```

## Monitoring & Troubleshooting

### Check Container Status
```bash
docker ps
docker logs nextjs-app
```

### View Application Logs
```bash
docker logs -f nextjs-app
```

### Restart Application
```bash
docker restart nextjs-app
```

### Update Application Manually
```bash
# Pull latest image
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Stop and remove old container
docker stop nextjs-app
docker rm nextjs-app

# Run new container
docker run -d --name nextjs-app -p 80:3000 --env-file /home/ubuntu/.env.production <account-id>.dkr.ecr.us-east-1.amazonaws.com/nextjs-order-management:latest
```

## SSL/HTTPS Setup (Optional)

For production, consider setting up SSL with nginx reverse proxy:

### Install nginx
```bash
sudo apt install nginx -y
```

### Configure nginx
```bash
sudo nano /etc/nginx/sites-available/nextjs-app
```

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

### Enable site
```bash
sudo ln -s /etc/nginx/sites-available/nextjs-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Support

If you encounter issues during deployment:
1. Check GitHub Actions logs
2. Verify AWS credentials and permissions
3. Ensure EC2 security groups allow traffic
4. Check Docker container logs on EC2
5. Verify environment variables are set correctly

## Rollback Process

To rollback to a previous version:
1. Find the previous image tag in ECR
2. SSH to EC2 instance
3. Stop current container
4. Run previous image version
```bash
docker stop nextjs-app
docker rm nextjs-app
docker run -d --name nextjs-app -p 80:3000 --env-file /home/ubuntu/.env.production <account-id>.dkr.ecr.us-east-1.amazonaws.com/nextjs-order-management:<previous-tag>
```
