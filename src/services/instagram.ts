'use server';

/**
 * Asynchronously retrieves Instagram post links by crawling the specified Instagram page.
 * It extracts href attributes from &lt;a&gt; tags within &lt;article&gt; elements.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of strings, each representing an Instagram post URL.
 * Returns an empty array in case of failure.
 */

export interface InstagramItem {
  type: 'reel' | 'post';
  href: string;
}

async function getInstagramLinks(): Promise<InstagramItem[]> {
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

export default getInstagramLinks;
