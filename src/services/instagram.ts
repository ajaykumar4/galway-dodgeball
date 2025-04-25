'use server';

export interface InstagramPost {
  type: 'reel' | 'post';
  href: string;
}

export async function runInstagramScraper(): Promise<InstagramPost[]> {
  console.log('runInstagramScraper called, but scraping is now done in a separate application.');
  return [];
}
