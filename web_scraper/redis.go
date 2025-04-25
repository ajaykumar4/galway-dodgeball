package main

import (
    "context"
    "log"
    "time"

    "github.com/go-redis/redis/v9"
)

var rdb = redis.NewClient(&redis.Options{
    Addr:     getEnv("REDIS_ADDR", "localhost:6379"),
    Password: "", // or os.Getenv("REDIS_PASSWORD")
    DB:       0,
})

func SaveToRedis(key string, value string) {
    ctx := context.Background()
    err := rdb.Set(ctx, key, value, 24*time.Hour).Err()
    if err != nil {
        log.Printf("❌ Redis set failed for %s: %v", key, err)
    } else {
        log.Printf("📝 Saved to Redis: %s", key)
    }
}

func getEnv(key, fallback string) string {
    if val := os.Getenv(key); val != "" {
        return val
    }
    return fallback
}
