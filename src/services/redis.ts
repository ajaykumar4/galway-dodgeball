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
