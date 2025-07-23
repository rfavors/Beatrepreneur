# Beatrepreneur - Hip Hop Producer & Artist Website

A full-stack web application for Koollbreezze da Beatrepreneur, featuring a modern React frontend with Express.js backend, built with TypeScript and deployed using Docker.

## 🚀 Features

- **Modern React Frontend**: Built with Vite, TypeScript, and Tailwind CSS
- **Express.js Backend**: RESTful API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **File Uploads**: Video and thumbnail management with Cloudinary integration
- **UI Components**: Radix UI components with custom styling
- **Authentication**: Passport.js integration
- **Real-time Features**: WebSocket support

## 📋 Prerequisites

Before deploying to Coolify, ensure you have:

- A Coolify instance running
- A PostgreSQL database (Supabase, Neon, or self-hosted)
- Cloudinary account (optional, for media uploads)
- Git repository access

## 🐳 Deployment to Coolify

### Step 1: Prepare Your Environment Variables

In Coolify, set up the following environment variables:

```bash
# Database Configuration
DATABASE_URL=postgresql://username:password@host:port/database

# Node Environment
NODE_ENV=production

# Server Configuration
PORT=5000
HOST=0.0.0.0

# Optional: Cloudinary Configuration (if using media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Session Secret (generate a secure random string)
SESSION_SECRET=your_secure_session_secret_here
```

### Step 2: Create a New Application in Coolify

1. **Login to your Coolify dashboard**
2. **Click "+ New" → "Application"**
3. **Choose "Docker Image" as the source**
4. **Configure the application:**
   - **Name**: `beatrepreneur`
   - **Git Repository**: Your repository URL
   - **Branch**: `main` (or your preferred branch)
   - **Build Pack**: `Docker`
   - **Dockerfile Location**: `./Dockerfile`

### Step 3: Configure Build Settings

1. **Build Configuration:**
   - **Build Command**: Not needed (handled by Dockerfile)
   - **Start Command**: Not needed (handled by Dockerfile)
   - **Port**: `5000`

2. **Environment Variables:**
   - Add all the environment variables listed in Step 1
   - Make sure `DATABASE_URL` points to your PostgreSQL instance

### Step 4: Configure Networking

1. **Port Configuration:**
   - **Internal Port**: `5000`
   - **External Port**: `80` or `443` (for HTTPS)

2. **Domain Configuration:**
   - Set your custom domain or use the provided Coolify subdomain
   - Enable HTTPS if using a custom domain

### Step 5: Database Setup

1. **Database Migration:**
   - The application uses Drizzle ORM for database management
   - Migrations are located in the `./migrations` folder
   - Run migrations after first deployment:

```bash
# Connect to your application container and run:
npm run db:push
```

### Step 6: Deploy

1. **Click "Deploy"** in Coolify
2. **Monitor the build logs** for any issues
3. **Wait for deployment to complete**
4. **Access your application** via the provided URL

## 🔧 Local Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database

### Setup

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd beatrepreneur
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your database URL and other configurations
```

4. **Run database migrations:**
```bash
npm run db:push
```

5. **Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
│   └── index.html         # HTML template
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # File storage logic
│   └── cloudinary.ts     # Cloudinary integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema
├── migrations/           # Database migrations
├── uploads/             # Local file uploads (development)
├── Dockerfile           # Docker configuration
├── .dockerignore        # Docker ignore file
└── package.json         # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Issues:**
   - Verify `DATABASE_URL` is correctly formatted
   - Ensure database is accessible from Coolify
   - Check firewall settings

2. **Build Failures:**
   - Check build logs in Coolify dashboard
   - Verify all dependencies are properly listed in `package.json`
   - Ensure TypeScript compilation succeeds

3. **File Upload Issues:**
   - Verify Cloudinary credentials if using cloud storage
   - Check file permissions for local uploads
   - Ensure upload directories exist

### Logs and Monitoring

- **Application Logs**: Available in Coolify dashboard
- **Database Logs**: Check your PostgreSQL provider's dashboard
- **Build Logs**: Available during deployment in Coolify

## 🔒 Security Considerations

- **Environment Variables**: Never commit sensitive data to version control
- **Database**: Use strong passwords and enable SSL connections
- **Session Secret**: Use a cryptographically secure random string
- **File Uploads**: Validate file types and sizes
- **HTTPS**: Always use HTTPS in production

## 📞 Support

For deployment issues:
1. Check Coolify documentation
2. Review application logs
3. Verify environment variables
4. Test database connectivity

## 🚀 Production Optimizations

- **CDN**: Consider using a CDN for static assets
- **Database**: Set up connection pooling
- **Monitoring**: Implement application monitoring
- **Backups**: Set up automated database backups
- **Scaling**: Configure horizontal scaling if needed

---

**Built with ❤️ for Koollbreezze da Beatrepreneur**