# Galway Dodgeball Hub

This is a NextJS starter project for the Galway Dodgeball Hub.

This project is split into two separate applications:

*   **Website (this directory):** A Next.js application for the Galway Dodgeball website. It fetches data from a Redis database populated by the web scraper.
*   **Web Scraper (separate application):** A Go application that scrapes data from Instagram and Meetup, and stores it in a Redis database.

## Website (This Directory)

This is the Next.js application that serves the user-facing website.

### Prerequisites

*   Node.js and npm installed
*   A running Redis instance (can be local or remote)

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
    Replace `your_redis_host:6379` with the actual host and port of your Redis server (e.g., `localhost:6379` if running locally).

### Running the Website

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command starts the Next.js development server, typically on port 9002.
2.  Open your browser and navigate to `http://localhost:9002`.

### Building the Website

1.  Run `npm run build` to create a production build.
2.  Run `npm start` to start the production server (ensure `REDIS_URL` is set in the production environment).

## Web Scraper (Go Application in `web_scraper` directory)

The web scraper is a separate Go application responsible for fetching data from Instagram and Meetup and storing it in the Redis database that the website uses.

### Prerequisites

*   Go installed (check `go.mod` for version)
*   A running Redis instance

### Installation & Running

Refer to the README or instructions within the `web_scraper` directory for details on how to build and run the Go scraper application. You will likely need to configure environment variables for Redis, proxy credentials (if needed), and potentially API keys or target URLs.

## Running Both Applications Together (Using Docker - Optional)

Docker and Docker Compose can be used to run both the website and the scraper (along with Redis) in containers.

### Prerequisites

*   Docker and Docker Compose installed

### Configuration

1.  Ensure you have a `.env` file in the root directory with `REDIS_URL=redis://redis:6379`.
2.  Configure environment variables for the scraper within the `docker-compose.yml` file or via a separate `.env` file referenced by the scraper's service definition (check the scraper's setup instructions).

### Running with Docker Compose

1.  **Build and start the services:**
    ```bash
    docker-compose up --build
    ```
    This command will build the images for the website and scraper (if Dockerfiles are correctly set up) and start containers for the website, scraper, and Redis.
2.  The website should be accessible at `http://localhost:9002`. The scraper will run in the background according to its schedule.

**Note:** The provided `docker-compose.yml` needs corresponding `Dockerfile` for the website (e.g., `Dockerfile`) and `Dockerfile-scraper` for the Go scraper within the `web_scraper` directory. Ensure these Dockerfiles correctly build their respective applications.
