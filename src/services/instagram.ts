'use server';

import puppeteer from 'puppeteer';

interface InstagramItem {
  type: 'reel' | 'post';
  href: string;
}

async function runInstagramScraper(): Promise<InstagramItem[]> {
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

    const articles = await page.$$('article');

    const items: InstagramItem[] = [];
    for (const article of articles) {
      const aTags = await article.$$eval('a', (elements: HTMLAnchorElement[]) => {
        return elements
          .filter(element => element.querySelector('img'))
          .map(element => {
            const href = element.href;
            let type: 'reel' | 'post' = href.includes('/reel/') ? 'reel' : 'post';
            return {
              href,
              type,
            };
          });
      });
      items.push(...aTags);
    }
    console.log('Items', items);
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

export {runInstagramScraper};

