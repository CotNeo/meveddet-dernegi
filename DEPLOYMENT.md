# Meveddet Derneği - Deployment Guide

This guide provides instructions for building and deploying the Meveddet Derneği website to Netlify.

## Prerequisites

- Node.js (version 18 or higher)
- npm (version 9 or higher)
- Git

## Building the Application

To build the application for production, run:

```bash
npm run build
```

This will create a production-ready build in the `.next` directory.

## Deploying to Netlify

### Option 1: Using Netlify CLI

1. Install the Netlify CLI globally:

```bash
npm install -g netlify-cli
```

2. Login to your Netlify account:

```bash
netlify login
```

3. Initialize a new Netlify site (if not already done):

```bash
netlify init
```

4. Deploy the site:

```bash
netlify deploy --prod
```

### Option 2: Connecting to GitHub for Continuous Deployment

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

## Configuration Files

The project includes the following configuration files for deployment:

- `netlify.toml`: Contains Netlify-specific configuration
- `next.config.js`: Contains Next.js configuration

## Environment Variables

Make sure to set the following environment variables in your Netlify dashboard:

- `NODE_ENV`: Set to `production` for production deployments
- Any other environment variables required by your application

## Troubleshooting

If you encounter any issues during deployment:

1. Check the Netlify deployment logs
2. Verify that all dependencies are correctly installed
3. Ensure that the build command is correctly configured
4. Check that the publish directory is set to `.next`

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Next.js Plugin Documentation](https://github.com/netlify/netlify-plugin-nextjs) 