'use server';

import puppeteer from 'puppeteer';

export interface InstagramPost {
  type: 'reel' | 'post';
  href: string;
}

export async function runInstagramScraper(): Promise<InstagramPost[]> {
  const url = 'https://www.instagram.com/galwaydodgeball/';
  let browser: puppeteer.Browser | null = null;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
    );

    await page.goto(url, {waitUntil: 'networkidle2'});

    await new Promise(resolve => setTimeout(resolve, 5000));

    // Extract all article elements from the page
    const articles = await page.$$('article');

    const posts: InstagramPost[] = [];
    
    for (const article of articles) {
      // Find all <a> tags within the article that have an <img> tag as a child
      const aTags = await article.$$eval('a', (elements: HTMLAnchorElement[]) => {
        return elements
          .filter(element => element.querySelector('img')) // Only include <a> tags that have an <img> child
          .map(element => {
            return {
              href: element.href
            };
          });
      });
      for (const aTag of aTags) {
        if (aTag.href.includes('/reel/')) {
          posts.push({
                href: aTag.href,
                type: 'reel',
            });
        } else if (aTag.href.includes('/p/')) {
            posts.push({
              href: aTag.href,
              type: 'post',
            });
        }
      }
    }
    console.log('posts', posts);
    return posts;
  } catch (error: any) {
    console.error('Error during scraping:', error.message);
    return [] ;
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}