package main

import (
    "context"
    "log"
    "strings"

    "github.com/chromedp/chromedp"
)

func ScrapeInstagram() {
    url := "https://www.instagram.com/galwaydodgeball/"
    err := RunWithFallback(func(ctx context.Context) error {
        var html string
        if err := chromedp.Run(ctx,
            chromedp.Navigate(url),
            chromedp.Sleep(5*time.Second),
            chromedp.OuterHTML("html", &html),
        ); err != nil {
            return err
        }

        posts := ExtractInstagramPosts(html)
        for _, post := range posts {
            SaveToRedis("instagram:"+post, post)
        }

        return nil
    })

    if err != nil {
        log.Printf("❌ Instagram scraping failed: %v", err)
    } else {
        log.Println("✅ Instagram scraped successfully")
    }
}

func ExtractInstagramPosts(html string) []string {
    // Basic example: look for posts with `/p/`
    var posts []string
    for _, line := range strings.Split(html, `"`) {
        if strings.Contains(line, "/p/") && !strings.Contains(line, "?") {
            posts = append(posts, "https://www.instagram.com"+line)
        }
    }
    return posts
}
