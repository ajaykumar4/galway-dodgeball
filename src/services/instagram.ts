'use server';

import puppeteer from 'puppeteer';

/**
 * Asynchronously retrieves Instagram post links by crawling the specified Instagram page.
 * It extracts href attributes from <a> tags within <article> elements.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of strings, each representing an Instagram post URL.
 * Returns an empty array in case of failure.
 */

export interface InstagramItem {
  type: 'reel' | 'post';
  href: string;
}

export async function getInstagramLinks(): Promise<InstagramItem[]> {
  const url = 'https://www.instagram.com/galwaydodgeball/';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch Instagram page: ${response.status} ${response.statusText}`);
      return [];
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const articleElements = doc.querySelectorAll('article');
    const items: InstagramItem[] = [];

    articleElements.forEach(article => {
      const aTags = article.querySelectorAll('a[role="link"][tabindex="0"]');
      aTags.forEach(aTag => {
        const href = aTag.getAttribute('href');
        if (href) {
          let type: 'reel' | 'post' = 'post';
          if (href.includes('/reel/')) {
            type = 'reel';
          }
          items.push({ type: type, href: `https://www.instagram.com${href}` });
        }
      });
    });

    console.log('Items:', items);
    return items;
  } catch (error) {
    console.error("Error fetching Instagram page:", error);
    return [];
  }
}

export async function runInstagramScraper() {
  const url = 'https://www.instagram.com/galwaydodgeball/';
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto(url);

      // Wait for the articles to load (you might need to adjust the selector and waiting time)
      await page.waitForSelector('article');
      const articleHandles = await page.$$('article');
      for (const articleHandle of articleHandles) {
          const aTags = await articleHandle.$$('a');
          for (const aTag of aTags) {
              const href = await aTag.evaluate(node => node.getAttribute('href'));
              if (href) {
                  console.log('Article Link:', `https://www.instagram.com${href}`);
              }
          }
      }
  } catch (error: any) {
    console.error('Error during scraping:', error.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}
