# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Redis Integration

This project can be configured to use Redis for caching data from external APIs like Instagram and Meetup. Here's how to set it up:

### 1. Install Redis

You'll need a Redis server. You can install it locally or use a cloud-based Redis service.

### 2. Configure Environment Variables

Add the following environment variables to your `.env` file:

*   `REDIS_URL`: The URL of your Redis server (e.g., `redis://localhost:6379`).

### 3. Install Redis client

```bash
npm install ioredis
```

### 4. Create a Redis Service
Create a service to interact with Redis. For example, create a file `src/services/redis.ts`:

```ts
// src/services/redis.ts
import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl);

export async function getCachedData(key: string): Promise<string | null> {
  try {
    const data = await redis.get(key);
    return data;
  } catch (error) {
    console.error('Redis get error:', error);
    return null;
  }
}

export async function setCachedData(key: string, data: string, expirySeconds: number): Promise<void> {
  try {
    await redis.set(key, data, 'EX', expirySeconds);
  } catch (error) {
    console.error('Redis set error:', error);
  }
}
```

### 5. Implement Caching in Instagram and Meetup Services

Modify `src/services/instagram.ts` and `src/services/meetup.ts` to use the Redis service. For example:

```ts
// src/services/instagram.ts
import { getCachedData, setCachedData } from './redis';

const INSTAGRAM_CACHE_KEY = 'instagram_feed';
const CACHE_EXPIRY_SECONDS = 3600; // 1 hour

export async function runInstagramScraper(): Promise<InstagramPost[]> {
  const cachedData = await getCachedData(INSTAGRAM_CACHE_KEY);
  if (cachedData) {
    console.log('Using cached Instagram data');
    return JSON.parse(cachedData);
  }

  // ... existing scraping logic ...

  const posts: InstagramPost[] = [];
  // ... populate posts ...

  await setCachedData(INSTAGRAM_CACHE_KEY, JSON.stringify(posts), CACHE_EXPIRY_SECONDS);
  return posts;
}
```

```ts
// src/services/meetup.ts
import { getCachedData, setCachedData } from './redis';

const MEETUP_CACHE_KEY = 'meetup_events';
const CACHE_EXPIRY_SECONDS = 3600; // 1 hour

export async function getUpcomingEvents(): Promise<MeetupEvent[]> {
  const cachedData = await getCachedData(MEETUP_CACHE_KEY);
  if (cachedData) {
    console.log('Using cached Meetup data');
    return JSON.parse(cachedData);
  }

  // ... existing Meetup API logic ...

  const events: MeetupEvent[] = [];
  // ... populate events ...

  await setCachedData(MEETUP_CACHE_KEY, JSON.stringify(events), CACHE_EXPIRY_SECONDS);
  return events;
}
```

## Docker

### 1. Create a Dockerfile

Create a `Dockerfile` in the root directory of your project:

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 9002

# Define environment variable
ENV NODE_ENV production

# Build the Next.js application
RUN npm run build

# Start the server
CMD [ "npm", "start" ]
```

### 2. Build the Docker Image

```bash
docker build -t firebase-studio .
```

### 3. Run the Docker Container

```bash
docker run -p 9002:9002 -d firebase-studio
```

## Deploy to Firebase

Follow the [Firebase documentation](https://firebase.google.com/docs/hosting) to deploy your Next.js application to Firebase Hosting.
Make sure to set the necessary environment variables in your Firebase environment.
