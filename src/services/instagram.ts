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
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
    } catch (error) {
      console.error('Error navigating to the page:', error);
      return [];
    }

    // Wait for the articles to load (you might need to adjust the selector and waiting time)
    await page.waitForSelector('article');
    const articleElements = await page.$$('article');
    console.log('Article Elements:', articleElements);

    const items: InstagramItem[] = [];

    for (const articleHandle of articleElements) {
      const aTags = await articleHandle.$$('a[role="link"][tabindex="0"]');
      for (const aTag of aTags) {
        const href = await aTag.evaluate(node => node.getAttribute('href'));
        if (href) {
          const fullHref = `https://www.instagram.com${href}`;
          let type: 'reel' | 'post' = 'post';
          if (href.includes('/reel/')) {
            type = 'reel';
          }
          items.push({ type: type, href: fullHref });
        }
      }
    }
    console.log('Items:', items);
    return items;
  } catch (error: any) {
    console.error('Error during scraping:', error.message);
    return [];
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}
