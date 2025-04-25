// src/services/redis.ts
import Redis from 'ioredis';

interface InstagramPost {
  url: string;
  type: string;
}

interface MeetupEvent {
  time: string;
  href: string;
}


const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl);

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const data = await getCachedData('instagram_posts');
  if (!data) return [];
  try {
    const posts = JSON.parse(data) as InstagramPost[];
    return posts;
  } catch (error) {
    console.error('Error parsing Instagram posts:', error);
    return [];
  }
}

export async function getMeetupEvents(): Promise<MeetupEvent[]> {
  const data = await getCachedData('meetup_events');
  if (!data) return [];
  try {
    const events = JSON.parse(data) as MeetupEvent[];
    return events;
  } catch (error) {
    console.error('Error parsing Meetup events:', error);
    return [];
  }
}

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
