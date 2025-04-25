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
