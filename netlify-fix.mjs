/**
 * Netlify Deployment Fix for Next.js
 * 
 * This script helps fix common issues with Next.js deployments on Netlify.
 * Run this script after building your Next.js application to ensure proper deployment.
 */

import fs from 'fs';
import path from 'path';

// Function to check if .next directory exists
function checkNextDirectory() {
  const nextDirPath = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDirPath)) {
    console.error('Error: .next directory not found. Please run "npm run build" first.');
    process.exit(1);
  }
  console.log('✅ .next directory found');
}

// Function to create _redirects file for Netlify
function createRedirectsFile() {
  const redirectsContent = `
# Netlify redirects for Next.js
/_next/static/*  /_next/static/:splat  200
/api/*  /.netlify/functions/api/:splat  200
/*  /index.html  200
`;
  
  const redirectsPath = path.join(process.cwd(), '.next', '_redirects');
  fs.writeFileSync(redirectsPath, redirectsContent.trim());
  console.log('✅ Created _redirects file in .next directory');
}

// Function to create a netlify.toml file in the .next directory
function createNetlifyTomlInNextDir() {
  const netlifyTomlContent = `
[build]
  publish = "."

[[plugins]]
  package = "@netlify/plugin-nextjs"

# These redirects are crucial for Next.js static assets
[[redirects]]
  from = "/_next/static/*"
  to = "/_next/static/:splat"
  status = 200

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;
  
  const netlifyTomlPath = path.join(process.cwd(), '.next', 'netlify.toml');
  fs.writeFileSync(netlifyTomlPath, netlifyTomlContent.trim());
  console.log('✅ Created netlify.toml file in .next directory');
}

// Main function
function main() {
  console.log('🔍 Starting Netlify deployment fix for Next.js...');
  
  checkNextDirectory();
  createRedirectsFile();
  createNetlifyTomlInNextDir();
  
  console.log('✅ All fixes applied successfully!');
  console.log('📝 Next steps:');
  console.log('1. Deploy your site to Netlify using "netlify deploy --prod"');
  console.log('2. Make sure the publish directory is set to ".next"');
  console.log('3. Check that the @netlify/plugin-nextjs plugin is installed and enabled');
}

// Run the main function
main();