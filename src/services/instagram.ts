'use server';

import { JSDOM } from 'jsdom';

/**
 * Asynchronously retrieves Instagram post links by crawling the specified Instagram page.
 * It extracts href attributes from &lt;a&gt; tags within &lt;article&gt; elements.
 *
 * @returns {Promise&lt;string[]&gt;} A promise that resolves to an array of strings, each representing an Instagram post URL.
 * Returns an empty array in case of failure.
 */
async function getInstagramLinks(): Promise<string[]> {
  const url = 'https://www.instagram.com/galwaydodgeball/';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch Instagram page: ${response.status} ${response.statusText}`);
      return [];
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const articleElements = document.querySelectorAll('article');
    const links: string[] = [];

    articleElements.forEach(article => {
      const aTags = article.querySelectorAll('a');
      aTags.forEach(aTag => {
        const href = aTag.getAttribute('href');
        if (href) {
          links.push(href);
        }
      });
    });

    return links;
  } catch (error) {
    console.error("Error fetching Instagram page:", error);
    return [];
  }
}

export default getInstagramLinks;

