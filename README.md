# Firebase Studio

This is a NextJS starter in Firebase Studio.

This project is now split into two separate applications:

*   **Website (this directory):** A Next.js application for the Galway Dodgeball website. It fetches data from a Redis database.
*   **Web Scraper (separate application):** A Node.js application that scrapes data from Instagram and Meetup, and stores it in a Redis database.

## Website (This Directory)

To get started with the website, take a look at `src/app/page.tsx`.

### Prerequisites

*   Node.js and npm installed

### Installation

1.  Clone the repository.
2.  Navigate to the website directory.
3.  Run `npm install` to install dependencies.

### Configuration

1.  Create a `.env` file in the root directory.
2.  Add the following environment variables:

    *   `REDIS_URL`: The URL of your Redis server (e.g., `redis://localhost:6379`).

### Running the Website

1.  Run `npm run dev` to start the development server.
2.  Open your browser and navigate to `http://localhost:9002`.

### Building the Website

1.  Run `npm run build` to create a production build.
2.  Run `npm start` to start the production server.

## Web Scraper (Separate Application)

The web scraper is a separate Node.js application responsible for fetching data from Instagram and Meetup and storing it in a Redis database.

### Prerequisites

*   Node.js and npm installed
*   Redis server running

### Installation

1.  Create a new directory for the web scraper (e.g., `web-scraper`).
2.  Create a `package.json` file in the `web-scraper` directory with the following content:

    ```json
    {
      "name": "web-scraper",
      "version": "1.0.0",
      "description": "Web scraper for Instagram and Meetup data",
      "main": "scraper.js",
      "scripts": {
        "start": "node scraper.js"
      },
      "dependencies": {
        "@sparticuz/chromium": "^122.0.0",
        "ioredis": "^5.3.2",
        "puppeteer": "^22.5.0"
      }
    }
    ```
3.  Create a `scraper.js` file in the `web-scraper` directory (see example code below).
4.  Run `npm install` in the `web-scraper` directory to install dependencies.

### Configuration

1.  Create a `.env` file in the `web-scraper` directory.
2.  Add the following environment variables:

    *   `REDIS_URL`: The URL of your Redis server (e.g., `redis://localhost:6379`).
    *   `INSTAGRAM_URL`: The URL of the Instagram page to scrape (e.g., `https://www.instagram.com/galwaydodgeball/`).
    *   `MEETUP_API_KEY`: Your Meetup API key.
    *   `MEETUP_GROUP_ID`: Your Meetup group ID.

### Running the Web Scraper

1.  Run `node scraper.js` in the `web-scraper` directory to start the scraper.
    The scraper will run periodically (e.g., every hour) and update the Redis database with the latest data.

### Example scraper.js

```javascript
// web-scraper/scraper.js
const puppeteer = require('puppeteer');
const chromium = require('@sparticuz/chromium');
const Redis = require('ioredis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redis = new Redis(redisUrl);

const INSTAGRAM_URL = process.env.INSTAGRAM_URL;
const MEETUP_API_KEY = process.env.MEETUP_API_KEY;
const MEETUP_GROUP_ID = process.env.MEETUP_GROUP_ID;

const INSTAGRAM_CACHE_KEY = 'instagram_feed';
const MEETUP_CACHE_KEY = 'meetup_events';
const CACHE_EXPIRY_SECONDS = 3600; // 1 hour

async function scrapeInstagram() {
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

    await page.goto(INSTAGRAM_URL, {waitUntil: 'networkidle2'});

    // Wait for the articles to load (you might need to adjust the selector and waiting time)
    await page.waitForSelector('article');

    // Extract all article elements from the page
    const articles = await page.$$('article');

    const posts = [];
    
    for (const article of articles) {
      // Find all <a> tags within the article that have an <img> tag as a child
      const aTags = await article.$$eval('a', (elements) => {
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
    await redis.set(INSTAGRAM_CACHE_KEY, JSON.stringify(posts), 'EX', CACHE_EXPIRY_SECONDS);
    console.log('Instagram data scraped and cached');
    await browser.close();
  } catch (error) {
    console.error('Error during Instagram scraping:', error);
  }
}

async function fetchMeetupEvents() {
  try {
    const graphqlQuery = {
      query: `
        query {
          groupByUrlname(urlname: "${MEETUP_GROUP_ID}") {
            name
            id
            events(input: { first: 4, status: UPCOMING }) {
              count
              edges {
                node {
                  id
                  title
                  description
                  eventUrl
                  dateTime
                }
              }
            }
          }
        }
      `,
    };

    const response = await fetch("https://api.meetup.com/gql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MEETUP_API_KEY}`,
      },
      body: JSON.stringify(graphqlQuery),
    });

    if (!response.ok) {
      console.error(`Meetup API request failed with status: ${response.status}`);
      return;
    }

    const data = await response.json();

    if (!data.data || !data.data.groupByUrlname || !data.data.groupByUrlname.events) {
      console.error("Failed to fetch events from Meetup API", data);
      return;
    }

    const eventsData = data.data.groupByUrlname.events.edges;

    const events = eventsData.map((event) => {
      return {
        id: event.node.id,
        name: event.node.title,
        url: event.node.eventUrl,
        description: event.node.description,
        time: new Date(event.node.dateTime).toLocaleString(), // Format the date and time
      };
    });
    await redis.set(MEETUP_CACHE_KEY, JSON.stringify(events), 'EX', CACHE_EXPIRY_SECONDS);
    console.log('Meetup data fetched and cached');
  } catch (error) {
    console.error("Error fetching Meetup events:", error);
  }
}

async function main() {
  try{
     await scrapeInstagram();
     await fetchMeetupEvents();
  } catch(e){
    console.log('scraper error',e);
  }
  finally {
      console.log('scraping complete');
      process.exit(0);
  }
}

main();

```

### Redis Service (Website)

1.  Update the `src/services/redis.ts` file to connect to Redis:

    ```typescript
    // src/services/redis.ts
    import Redis from 'ioredis';

    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

    export const redis = new Redis(redisUrl);

    export async function getCachedData(key: string): Promise<string | null> {
      try {
        const data = await redis.get(key);
        return data;
      } catch (error) {
        console.error('Redis get error:', error);
        return null;
      }
    }

    export async function setCachedData(key: string, data: string, expirySeconds: number): Promise<void> {
      try {
        await redis.set(key, data, 'EX', expirySeconds);
      } catch (error) {
        console.error('Redis set error:', error);
      }
    }
    ```

### Dockerization

You will need two Dockerfiles: one for the website and one for the web scraper.

**Dockerfile (Website)**

```dockerfile
# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 9002

# Define environment variable
ENV NODE_ENV production

# Build the Next.js application
RUN npm run build

# Start the server
CMD [ "npm", "start" ]
```

**Dockerfile (Web Scraper)**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY web-scraper/package*.json ./
COPY web-scraper/scraper.js ./

RUN npm install

COPY web-scraper/.env ./

CMD [ "node", "scraper.js" ]
```

### Docker Compose

To orchestrate both applications, you can use Docker Compose. Create a `docker-compose.yml` file in the root directory:

```yaml
version: "3.8"
services:
  website:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "9002:9002"
    environment:
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  web-scraper:
    build:
      context: .
      dockerfile: Dockerfile-scraper # Make sure to create this file
    environment:
      - REDIS_URL=redis://redis:6379
      - INSTAGRAM_URL=YOUR_INSTAGRAM_URL
      - MEETUP_API_KEY=YOUR_MEETUP_API_KEY
      - MEETUP_GROUP_ID=YOUR_MEETUP_GROUP_ID
    depends_on:
      - redis
    restart: always

  redis:
    image: "redis:latest"
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

**To run with Docker Compose:**

1.  Run `docker-compose up --build` in the root directory.

Remember to replace placeholder values with your actual values. This setup will run both applications and the Redis server, linking them together.

</details>

This should provide a clean separation of concerns, making each application more manageable and scalable.

  
