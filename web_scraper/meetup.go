package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"regexp"
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

        var events []MeetupEventJSON
		meetupEvents := ExtractMeetupEvents(html)
		for _, event := range meetupEvents {
            events = append(events, MeetupEventJSON{
                Time: event.Time,
                Href: event.Url,
            })
        }
		SaveToRedisJson("meetup_events", events)
        return nil
    })

    if err != nil {
        log.Printf("❌ Meetup scraping failed: %v", err)
    } else { 
        log.Println("✅ Meetup scraped successfully")
    }
}

type MeetupEventJSON struct {
	Time string `json:"time"`
	Href string `json:"href"`
}


type MeetupEvent struct {
	Url  string
	Time string
}

func ExtractMeetupEvents(html string) []MeetupEvent {
	var events []MeetupEvent

	// Find all <ul> tags
	reUl := regexp.MustCompile(`<ul[^>]*>.*?</ul>`)
	ulTags := reUl.FindAllString(html, -1)
    count := 0
	for _, ulTag := range ulTags {
		// Find all <li> tags within each <ul>
		reLi := regexp.MustCompile(`<li[^>]*>.*?</li>`)
		liTags := reLi.FindAllString(ulTag, -1)
        
		for _, liTag := range liTags {
            if count >= 4{
                break
            }
			// Find the <a> tag and extract its href
			reA := regexp.MustCompile(`<a[^>]*href=\\\"([^\\\"]+)\\\"[^>]*>`)
			aTag := reA.FindStringSubmatch(liTag)

			reTime := regexp.MustCompile(`<time[^>]*datetime=\\\"([^\\\"]+)\\\"[^>]*>`)
			timeTag := reTime.FindStringSubmatch(liTag)

			if len(aTag) >= 2 && len(timeTag) >= 2 {
				events = append(events, MeetupEvent{Url: fmt.Sprintf("https://www.meetup.com%s",aTag[1]), Time: timeTag[1]})
                count++
			}
		}
	}
	return events
}
