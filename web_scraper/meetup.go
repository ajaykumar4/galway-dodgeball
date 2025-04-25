package main

import (
    "context"
    "log"
    "strings"
    "time"

    "github.com/chromedp/chromedp"
)

func ScrapeMeetup() {
    url := "https://www.meetup.com/galway-dodgeball-club/"
    err := RunWithFallback(func(ctx context.Context) error {
        var html string
        if err := chromedp.Run(ctx,
            chromedp.Navigate(url),
            chromedp.Sleep(5*time.Second),
            chromedp.OuterHTML("html", &html),
        ); err != nil {
            return err
        }

        events := ExtractMeetupEvents(html)
        for _, event := range events {
            SaveToRedis("meetup:"+event, event)
        }

        return nil
    })

    if err != nil {
        log.Printf("❌ Meetup scraping failed: %v", err)
    } else {
        log.Println("✅ Meetup scraped successfully")
    }
}

func ExtractMeetupEvents(html string) []string {
    var events []string
    for _, line := range strings.Split(html, "\n") {
        if strings.Contains(line, "eventCard--link") {
            events = append(events, line)
        }
    }
    return events
}
