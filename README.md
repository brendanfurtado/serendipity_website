# Serendipity Dating

> A dating platform focused on balance, authenticity, and community-driven connections. Currently in development phase with active waitlist collection.

## Overview

Serendipity Dating reimagines online dating by prioritizing balanced communities and authentic connections over algorithmic manipulation. The platform combines a robust waitlist system with community features and content management to build engagement before launch.

### Core Philosophy

- **Balance**: Equal representation across communities
- **Authenticity**: Transparent algorithms and genuine connections
- **Community-First**: Relationships built within shared interest groups

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend
- **Payments**: Stripe
- **Styling**: Tailwind CSS + DaisyUI
- **Deployment**: Vercel (recommended)

## Features

### 🎯 Waitlist System

- Email collection with demographic data (age, gender)
- Real-time signup counters with live updates
- Privacy-compliant data collection (GDPR/CCPA)
- Email confirmation and admin notifications
- Analytics dashboard for signup tracking

### 📝 Content Management

- **Blog System**: Full-featured blog with categories, authors, and SEO
- **Article Management**: Rich content with image support and social sharing
- **Category & Author Pages**: Organized content discovery
- **SEO Optimization**: Structured data and meta tags

### 🔒 Privacy & Compliance

- **Privacy Requests**: GDPR/CCPA compliant data access/deletion
- **Opt-out Management**: Marketing and data processing preferences
- **Request Tracking**: Admin dashboard for privacy request management

### 🎪 Community Features

- **Event Management**: City-based event listings and RSVPs
- **Live Counters**: Real-time waitlist statistics
- **Social Integration**: Twitter/Instagram integration

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── waitlist/      # Waitlist management
│   │   └── privacy/       # Privacy request handling
│   ├── blog/              # Blog system
│   └── privacy/           # Privacy portal
├── components/            # Reusable components
│   ├── landing/          # Landing page components
│   └── ui/               # Shadcn/ui components
├── libs/                 # Utility libraries
│   ├── supabase/         # Database client
│   ├── resend.ts         # Email service
│   └── stripe.ts         # Payment processing
├── utils/                # Helper functions
├── config.ts             # App configuration
└── schema.sql           # Database schema
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Resend account
- Stripe account (for future payments)

### Local Development

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd serendipity-dating
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

3. **Configure Environment Variables**

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Email Configuration (Resend)
   RESEND_API_KEY=re_your_api_key

   # Development Email Settings
   SKIP_EMAILS=false  # Set to true to disable email sending
   DEVELOPER_EMAIL=your-email@example.com  # Receives all emails in dev

   # Stripe (Future Use)
   STRIPE_PUBLIC_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   ```

4. **Database Setup**

   - Create a new Supabase project
   - Run the SQL from `schema.sql` in your Supabase SQL editor
   - Enable Row Level Security policies

5. **Email Configuration**

   - Create Resend account and get API key
   - For development: Use `onboarding@resend.dev` as sender
   - For production: Verify your domain in Resend

6. **Start Development Server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000`

### Production Deployment

#### Vercel Deployment (Recommended)

1. **Deploy to Vercel**

   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   Set all production environment variables in Vercel dashboard:

   - Use production Supabase credentials
   - Use verified domain for Resend emails
   - Set `SKIP_EMAILS=false`
   - Configure production Stripe keys

3. **Domain Configuration**

   - Configure custom domain in Vercel
   - Update `domainName` in `config.ts`
   - Verify domain in Resend for email sending

4. **Database Migration**
   - Ensure production database has latest schema
   - Run any pending migrations
   - Configure RLS policies for production

#### Manual Deployment

1. **Build Application**

   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

## Database Schema

Key tables and functions:

### Tables

- `waitlist`: User signups with demographics and tracking
- `privacy_requests`: GDPR/CCPA compliance requests
- Analytics views for reporting

### Functions

- `add_waitlist_signup()`: Secure signup processing
- `get_signup_count()`: Real-time counter data
- `submit_privacy_request()`: Privacy request handling
- `process_marketing_opt_out()`: Opt-out management

See `schema.sql` for complete database structure.

## API Endpoints

### Waitlist Management

- `POST /api/waitlist` - Add new signup
- `GET /api/waitlist/count` - Get current signup count

### Privacy & Compliance

- `POST /api/privacy/request` - Submit privacy request
- `POST /api/privacy/opt-out` - Marketing opt-out

### Content Management

- Blog routes handled by Next.js file-based routing
- Dynamic routes for articles, categories, authors

## Development Workflow

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development
- `hotfix/*`: Critical production fixes

### Code Standards

- TypeScript strict mode enabled
- ESLint configuration included
- Tailwind CSS for styling
- Component-first architecture

### Testing

```bash
npm run lint        # Lint checking
npm run build       # Production build test
```

### Email Testing

- Set `SKIP_EMAILS=true` to disable email sending
- Set `DEVELOPER_EMAIL` to receive all emails in development
- Use Resend's test domain for development

## Configuration

### App Configuration (`config.ts`)

- Branding and messaging
- Event cities and details
- Email settings
- Stripe plans (future)
- Social media links

### Key Configuration Areas

- **Development vs Production**: Email domains and settings
- **Event Management**: City listings and event details
- **Privacy Compliance**: Email addresses and contact info
- **Branding**: Colors, messaging, social links

## Monitoring & Analytics

### Built-in Analytics

- Waitlist signup tracking
- Privacy request monitoring
- Email delivery status
- Database performance views

### External Integrations

- Supabase Analytics
- Vercel Analytics (if deployed on Vercel)
- Email delivery metrics via Resend

## Security Considerations

- **Database**: Row Level Security enabled
- **API Routes**: Input validation and rate limiting
- **Email**: Secure token generation and validation
- **Privacy**: GDPR/CCPA compliant data handling
- **Environment**: Secure secret management

## Troubleshooting

### Common Issues

1. **Email not sending**

   - Check `SKIP_EMAILS` setting
   - Verify Resend API key
   - Check domain verification status

2. **Database connection issues**

   - Verify Supabase credentials
   - Check RLS policies
   - Ensure service role key has correct permissions

3. **Build failures**
   - Clear `.next` folder
   - Verify all environment variables are set
   - Check TypeScript errors

### Debugging

- Check Vercel function logs for production issues
- Use Supabase logs for database debugging
- Monitor Resend dashboard for email delivery

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include loading states for async operations

### Database Changes

- Update `schema.sql` with any schema changes
- Test migrations thoroughly
- Document breaking changes

---

**Status**: Active Development | **Version**: 0.1.0 | **Last Updated**: December 2024
