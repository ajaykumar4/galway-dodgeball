package main

import (
    "context"
    "fmt"
    "log"
    "math/rand"
    "os"
    "time"

    "github.com/chromedp/cdproto/network"
    "github.com/chromedp/chromedp"
)

var proxyHosts = []string{
    "proxy1.example.com:8000",
    "proxy2.example.com:8000",
}

func NewChromeCtx(useProxy bool) (context.Context, context.CancelFunc, error) {
    opts := chromedp.DefaultExecAllocatorOptions[:]

    if useProxy {
        if len(proxyHosts) == 0 {
            return nil, nil, fmt.Errorf("no proxies available")
        }

        rand.Seed(time.Now().UnixNano())
        proxyHost := proxyHosts[rand.Intn(len(proxyHosts))]

        user := os.Getenv("PROXY_USERNAME")
        pass := os.Getenv("PROXY_PASSWORD")
        if user == "" || pass == "" {
            return nil, nil, fmt.Errorf("missing proxy credentials")
        }

        proxyURL := fmt.Sprintf("http://%s:%s@%s", user, pass, proxyHost)
        opts = append(opts, chromedp.ProxyServer(proxyURL))
        log.Println("🔁 Using proxy:", proxyURL)
    } else {
        log.Println("🌐 Using local IP")
    }

    allocCtx, cancel := chromedp.NewExecAllocator(context.Background(), opts...)
    ctx, cancelCtx := chromedp.NewContext(allocCtx)

    if err := chromedp.Run(ctx, network.Enable()); err != nil {
        cancelCtx()
        cancel()
        return nil, nil, err
    }

    return ctx, func() {
        cancelCtx()
        cancel()
    }, nil
}

func RunWithFallback(action func(ctx context.Context) error) error {
    ctx, cancel, err := NewChromeCtx(false)
    if err != nil {
        return err
    }
    defer cancel()

    if err := action(ctx); err == nil {
        return nil
    }

    log.Println("⚠️ Failed with local IP, retrying with proxy...")
    ctx, cancel, err = NewChromeCtx(true)
    if err != nil {
        return err
    }
    defer cancel()

    return action(ctx)
}
