package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"regexp"
	"strings"


	"github.com/chromedp/chromedp"
)

type InstagramItem struct {
	Type string
	Href string
}

type InstagramPost struct {
    Url  string `json:"url"`
    Type string `json:"type"`
}

func SaveToRedisJson(key string, value interface{}) {
    jsonData, _ := json.Marshal(value)
    SaveToRedis(key, string(jsonData))

}

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
		
        var posts []InstagramPost
		items := ExtractInstagramPosts(html)
		for _, item := range items {
			posts = append(posts, InstagramPost{
				Url: item.Href,
				Type: item.Type,
			})
		}
        SaveToRedisJson("instagram_posts", posts)
        }

        return nil
    })

    if err != nil {
        log.Printf("❌ Instagram scraping failed: %v", err)
    } else {
        log.Println("✅ Instagram scraped successfully")
    }
}

func ExtractInstagramPosts(html string) []InstagramItem {
	var items []InstagramItem
	// Find all <article> tags
	reArticle := regexp.MustCompile(`<article[^>]*>.*?</article>`)
	articles := reArticle.FindAllString(html, -1)

	count := 0
	for _, article := range articles {
		if count >= 9 {
			break
		}
		// Find all <a> tags within each <article>
		reA := regexp.MustCompile(`<a[^>]*href="([^"]+)"[^>]*>`)
		aTags := reA.FindAllStringSubmatch(article, -1)

		for _, aTag := range aTags {
			if count >= 9 {
				break
			}
			// Extract href attribute value
			if len(aTag) >= 2 {
				href := aTag[1]
				//Remove /galwaydodgeball from the url
				href = strings.Replace(href, "/galwaydodgeball", "", 1)

				if strings.HasPrefix(href, "/p/") && !strings.Contains(href, "?") {
					fullURL := fmt.Sprintf("https://www.instagram.com%s", href)					
					items = append(items, InstagramItem{Type: "post", Href: fullURL})
					count++
				} else if strings.HasPrefix(href, "/reel/") {
					fullURL := fmt.Sprintf("https://www.instagram.com%s", href)
					items = append(items, InstagramItem{Type: "reel", Href: fullURL})
					count++
				} else {
					continue
				}
			}
		}
	}
	return items
}