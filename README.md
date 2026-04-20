# Infonet

Stable and complete information display and management system.

This repository contains the front end. The API and service have been moved to their own repo

## To develop
Clone the repo and create appropriate .env files

`.env.development.local`  
`.env.production.local`  
`.env.staging.local`  
`.env.test.local`  

These are available .env vars:

```.env
VITE_APP_API_ENDPOINT=[api]
VITE_APP_TEST_MODE=false
VITE_APP_SUPABASE_URL=[url]
VITE_APP_SUPABASE_KEY=[token leak!]
VITE_APP_FORCE_ORG=myorg
NODE_ENV=development
```
Develop in the `development` branch, use PR's if unsure
