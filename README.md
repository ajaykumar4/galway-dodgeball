# Galway Dodgeball Hub

This is a NextJS starter project for the Galway Dodgeball Hub.

This project is split into two separate applications:

*   **Website (this directory):** A Next.js application for the Galway Dodgeball website. It fetches data from a Redis database populated by the web scraper.
*   **Web Scraper (`web_scraper` directory):** A Go application that scrapes data from Instagram and Meetup, and stores it in a Redis database.

## Website (This Directory)

This is the Next.js application that serves the user-facing website.

### Prerequisites

*   Node.js and npm installed
*   A running Redis instance (can be local or remote) - *Note: The web scraper populates Redis.*

### Installation

1.  Clone the repository (if you haven't already).
2.  Navigate to the root directory of the project (where this README is located).
3.  Run `npm install` to install dependencies for the website.

### Configuration

1.  Create a `.env` file in the root directory (this directory).
2.  Add the following environment variable, pointing to your Redis instance:

    ```
    REDIS_URL=redis://your_redis_host:6379
    ```
    Replace `your_redis_host:6379` with the actual host and port of your Redis server (e.g., `localhost:6379` if running locally, or `redis:6379` if using Docker Compose).
3.  Make sure the `NEXT_PUBLIC_PORT` variable is also set if you need to run on a specific port (default is 9002 in the Docker setup).

    ```
    NEXT_PUBLIC_PORT=9002
    ```

### Running the Website (Development)

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command starts the Next.js development server, typically on port 9002 (or the port specified in `.env`).
2.  Open your browser and navigate to `http://localhost:9002`.

### Building the Website (Production)

1.  Run `npm run build` to create a production build.
2.  Run `npm start` to start the production server (ensure `REDIS_URL` is set in the production environment).

## Web Scraper (Go Application in `web_scraper` directory)

The web scraper is a separate Go application responsible for fetching data from Instagram and Meetup and storing it in the Redis database that the website uses.

### Prerequisites

*   Go installed (check `go.mod` for version)
*   A running Redis instance

### Installation & Running

Refer to the instructions within the `web_scraper` directory (if any specific setup is needed). Generally:

1.  Navigate to the `web_scraper` directory.
2.  Run `go build -o scraper .` to build the executable.
3.  Configure necessary environment variables (e.g., `REDIS_ADDR`, `PROXY_USERNAME`, `PROXY_PASSWORD`). You might use a `.env` file within the `web_scraper` directory or set them directly.
4.  Run `./scraper` to start the scraper.

## Running Both Applications Together (Using Docker Compose)

Docker and Docker Compose are the recommended way to run both the website and the scraper (along with Redis) in isolated containers.

### Prerequisites

*   Docker and Docker Compose installed

### Configuration

1.  Ensure you have a `.env` file in the root directory with `REDIS_URL=redis://redis:6379` and `NEXT_PUBLIC_PORT=9002` (or your desired port).
2.  Configure any necessary environment variables for the scraper (like proxy credentials) within the `docker-compose.yml` file under the `webscraper` service's `environment` section, or create a separate `.env` file in the `web_scraper` directory and reference it using `env_file` in `docker-compose.yml`.

### Running with Docker Compose

1.  **Build and start the services:** From the **root directory** of the project (where this README and `docker-compose.yml` are located), run:
    ```bash
    docker-compose up --build -d
    ```
    *   `--build`: Forces Docker to rebuild the images based on the Dockerfiles. Use this the first time or when you change dependencies/code.
    *   `-d`: Runs the containers in detached mode (in the background).
2.  The website should be accessible at `http://localhost:9002` (or the port you configured). The scraper will run in the background.
3.  **To view logs:**
    ```bash
    docker-compose logs -f ui # View website logs
    docker-compose logs -f webscraper # View scraper logs
    ```
4.  **To stop the services:**
    ```bash
    docker-compose down
    ```

**Note:** The provided `docker-compose.yml` uses `Dockerfile` for the website and `web_scraper/Dockerfile` for the Go scraper. Ensure these Dockerfiles correctly build their respective applications.

## Deployment

### Netlify (Website Only)

This section assumes you only want to deploy the Next.js website part to Netlify. The web scraper and Redis would need to be hosted elsewhere.

1.  **Connect your Git repository** to Netlify.
2.  **Configure Build Settings:**
    *   Netlify should automatically detect it's a Next.js project using the `@netlify/plugin-nextjs`.
    *   If manual configuration is needed, or to verify, use:
        *   **Build command:** `npm run build`
        *   **Publish directory:** `.next`
    *   The `netlify.toml` file in the root directory provides these settings.
3.  **Environment Variables:**
    *   In the Netlify UI (Site settings > Build & deploy > Environment), add the `REDIS_URL` environment variable, pointing to your *hosted* Redis instance. **Do not commit sensitive credentials directly into your code or `.env` file.**
4.  **Deploy:** Trigger a deploy manually or push to your connected Git branch.

**Important Considerations for Netlify:**

*   **Web Scraper:** Netlify is primarily for hosting static sites and frontend applications. The Go web scraper cannot be run directly on Netlify's build/deploy infrastructure long-term. You'll need to host the scraper and Redis separately (e.g., on a VPS, cloud service like Fly.io, Render, or using Docker on a server).
*   **Redis:** Netlify does not provide a built-in Redis service. You will need to use an external Redis provider (like Redis Cloud, Upstash, Aiven, etc.) and configure the `REDIS_URL` environment variable in Netlify accordingly.
