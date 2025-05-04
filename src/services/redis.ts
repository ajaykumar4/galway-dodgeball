'use server';
// src/services/redis.ts
import Redis from 'ioredis';

interface InstagramPost {
  url: string;
  type: 'reel' | 'post'; // Ensure type matches expected values
}

interface MeetupEvent {
  time: string;
  href: string;
}


const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  // Add connection options if needed, e.g., for TLS or password
  // showFriendlyErrorStack: true, // Helpful for debugging connection issues
  maxRetriesPerRequest: 3 // Optional: Retry failed commands
});

redis.on('error', (err) => {
  console.error('Redis Client Error:', err);
  // Handle connection errors appropriately, e.g., use fallback data or notify admins
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});


export async function getInstagramPosts(): Promise<InstagramPost[] | null> {
  const data = await getCachedData('instagram_posts');
  if (!data) return null; // Return null if no data found
  try {
    // Basic validation: check if it's likely JSON array structure
    if (!data.trim().startsWith('[') || !data.trim().endsWith(']')) {
       console.error('Invalid Instagram posts data format in Redis:', data);
       return null;
    }
    const posts = JSON.parse(data) as InstagramPost[];
    // Add further validation if needed (e.g., check properties of each post)
    return posts;
  } catch (error) {
    console.error('Error parsing Instagram posts from Redis:', error);
    return null; // Return null on parsing error
  }
}

export async function getMeetupEvents(): Promise<MeetupEvent[] | null> {
  const data = await getCachedData('meetup_events');
   if (!data) return null; // Return null if no data found
  try {
     // Basic validation: check if it's likely JSON array structure
    if (!data.trim().startsWith('[') || !data.trim().endsWith(']')) {
       console.error('Invalid Meetup events data format in Redis:', data);
       return null;
    }
    const events = JSON.parse(data) as MeetupEvent[];
     // Add further validation if needed
    return events;
  } catch (error) {
    console.error('Error parsing Meetup events from Redis:', error);
    return null; // Return null on parsing error
  }
}

export async function getCachedData(key: string): Promise<string | null> {
  try {
    const data = await redis.get(key);
    return data;
  } catch (error) {
    console.error(`Redis get error for key "${key}":`, error);
    // Depending on the error, you might want to throw it or handle differently
    return null; // Return null or rethrow based on desired error handling
  }
}

// Note: setCachedData is likely used by the scraper, not the UI directly.
export async function setCachedData(key: string, data: string, expirySeconds: number): Promise<void> {
  try {
    await redis.set(key, data, 'EX', expirySeconds);
  } catch (error) {
    console.error(`Redis set error for key "${key}":`, error);
    // Handle or throw error as needed
  }
}