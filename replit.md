# Beatrepreneur Website

## Overview

This is a modern React-based website for Koollbreezze da Beatrepreneur, a hip-hop music producer and artist. The application is built as a full-stack web application using React with TypeScript for the frontend and Express.js for the backend, designed to showcase the artist's music, videos, gallery, and personal brand.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development Server**: Custom Vite integration for hot module replacement
- **Database**: PostgreSQL with Neon serverless database
- **ORM**: Drizzle ORM for type-safe database operations

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Landing area with background video/image and call-to-action
- **Music Section**: Music player interface (placeholder for future audio integration)
- **Video Section**: Gallery of music videos with thumbnails
- **Gallery Section**: Image gallery with lightbox modal functionality
- **About Section**: Artist biography and social media links
- **Footer**: Contact information and additional social links

### Backend Components
- **Storage Interface**: Abstract storage layer with in-memory implementation
- **User Schema**: Database schema for user management using Drizzle ORM
- **Route Registration**: Modular API route system
- **Development Tools**: Hot reloading and error handling for development

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express.js handles requests and interacts with storage layer
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses sent back to client
5. **State Updates**: TanStack Query manages caching and state synchronization

## External Dependencies

### Core Dependencies
- **@radix-ui/***: Headless UI components for accessibility and functionality
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **wouter**: Lightweight React router

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express.js backend
- **Hot Reloading**: Real-time updates for both frontend and backend code
- **Error Handling**: Development-specific error overlays and logging

### Production Build
- **Frontend Build**: Vite builds optimized React application to `dist/public`
- **Backend Build**: esbuild compiles Express server to `dist/index.js`
- **Static Assets**: Frontend assets served from Express in production
- **Database**: Neon serverless PostgreSQL for production data storage

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Build Scripts**: Separate development and production build processes
- **Asset Handling**: Static file serving integrated with Express server

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Completed beatrepreneur.com clone with:
  • Hero section with Koollbreezze logo and clean background
  • Navigation with Music, Videos, Gallery, About, Beat Store, Admin
  • Music player interface ready for uploads
  • Video gallery with 3 music videos from original site
  • Photo gallery with 13 images and lightbox modal
  • Complete About section with artist biography
  • Social media integration and responsive design
  • Dark/light theme toggle functionality
- July 04, 2025. Completed MP4 video upload system:
  • Full admin interface for video uploads (/admin)
  • Support for MP4, MOV, AVI, MKV video files up to 500MB
  • Thumbnail image upload with JPG, PNG, WebP support
  • Real-time video preview and validation
  • File storage system with organized uploads directory
  • Video player modal with actual MP4 playback
  • Dynamic video gallery that updates from database
  • First video successfully uploaded: "Savior - Faire"
- July 04, 2025. Implemented persistent storage solution:
  • Cloudinary integration for cloud storage (prevents video loss on redeploy)
  • Hybrid storage approach: metadata in database, files in cloud
  • Storage configuration status indicator in admin panel
  • Automatic fallback to local storage in development
  • Dynamic storage warnings and setup guidance
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```