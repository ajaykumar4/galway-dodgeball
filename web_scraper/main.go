package main

import (
    "log"
    "os"
    "time"

    "github.com/go-co-op/gocron"
)

func main() {
    log.SetFlags(log.LstdFlags | log.Lshortfile)

    // Optional .env load
    _ = os.Setenv("PROXY_USERNAME", os.Getenv("PROXY_USERNAME"))
    _ = os.Setenv("PROXY_PASSWORD", os.Getenv("PROXY_PASSWORD"))

    scheduler := gocron.NewScheduler(time.UTC)

    scheduler.Every(4).Hours().Do(func() {
        log.Println("🕓 Scheduled task running...")
        ScrapeInstagram()
        ScrapeMeetup()
    })

    log.Println("🚀 Scheduler started")
    scheduler.StartBlocking()
}
