'use server';

import puppeteer from 'puppeteer';

/**
 * Asynchronously retrieves Instagram post links by crawling the specified Instagram page.
 * It extracts href attributes from <a> tags within <article> elements.
 *
 * @returns {Promise<void>}
 */
export async function runInstagramScraper() {
  const url = 'https://www.instagram.com/galwaydodgeball/';
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Log all web elements on the page
      const allElements = await page.$$('*');
      console.log('All Web Elements on Instagram Page:');
      for (const element of allElements) {
          const tagName = await element.evaluate(node => node.tagName);
          console.log(tagName);
      }

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
