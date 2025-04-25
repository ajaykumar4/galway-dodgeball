'use server';

import puppeteer from 'puppeteer-core';
import * as chromium from '@sparticuz/chromium';
import {getCachedData, setCachedData} from '@/services/redis';

export interface InstagramPost {
  type: 'reel' | 'post';
  href: string;
}

const INSTAGRAM_CACHE_KEY = 'instagram_feed';
const CACHE_EXPIRY_SECONDS = 3600; // 1 hour

export async function runInstagramScraper(): Promise<InstagramPost[]> {
  const cachedData = await getCachedData(INSTAGRAM_CACHE_KEY);
  if (cachedData) {
    console.log('Using cached Instagram data');
    return JSON.parse(cachedData);
  }

  const url = 'https://www.instagram.com/galwaydodgeball/';
  let browser: puppeteer.Browser | null = null;

  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'
    );

    await page.goto(url, {waitUntil: 'networkidle2'});

    // Wait for the articles to load (you might need to adjust the selector and waiting time)
    await page.waitForSelector('article');

    // Extract all article elements from the page
    const articles = await page.$$('article');

    const posts: InstagramPost[] = [];
    
    for (const article of articles) {
      // Find all <a> tags within the article that have an <img> tag as a child
      const aTags = await article.$$eval('a', (elements: HTMLAnchorElement[]) => {
        return elements
          .filter(element => element.querySelector('img')) // Only include <a> tags that have an <img> child
          .map(element => {
            const img = element.querySelector('img');
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
   await setCachedData(INSTAGRAM_CACHE_KEY, JSON.stringify(posts), CACHE_EXPIRY_SECONDS);
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
