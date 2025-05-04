# Galway Dodgeball Hub

This is the Next.js application for the Galway Dodgeball website.

## Prerequisites

*   Node.js and npm installed

## Installation

1.  Clone the repository (if you haven't already).
2.  Navigate to the root directory of the project (where this README is located).
3.  Run `npm install` to install dependencies.

## Configuration

1.  Create a `.env` file in the root directory (this directory).
2.  If you need to run on a specific port (other than the default 3000), add the `NEXT_PUBLIC_PORT` variable:

    ```
    NEXT_PUBLIC_PORT=9002
    ```

## Running the Website (Development)

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This command starts the Next.js development server, typically on port 3000 (or the port specified in `.env` or the `dev` script in `package.json`).
2.  Open your browser and navigate to `http://localhost:PORT` (replace PORT with the actual port number, e.g., 3000 or 9002).

## Building the Website (Production)

1.  Run `npm run build` to create a production build.
2.  Run `npm start` to start the production server (ensure `NEXT_PUBLIC_PORT` is set in the production environment if needed).

## Running with Docker

Docker can be used to run the website in an isolated container.

### Prerequisites

*   Docker installed

### Configuration

1.  Ensure you have a `.env` file in the root directory if you need to specify `NEXT_PUBLIC_PORT`.
2.  The `docker-compose.yml` file is configured to build and run the `ui` service (the Next.js app).

### Running with Docker Compose

1.  **Build and start the service:** From the **root directory**, run:
    ```bash
    docker-compose up --build -d
    ```
    *   `--build`: Forces Docker to rebuild the image. Use this the first time or when you change dependencies/code.
    *   `-d`: Runs the container in detached mode.
2.  The website should be accessible at `http://localhost:PORT` (the port you configured or the default 3000).
3.  **To view logs:**
    ```bash
    docker-compose logs -f ui
    ```
4.  **To stop the service:**
    ```bash
    docker-compose down
    ```

## Deployment (Netlify)

1.  **Connect your Git repository** to Netlify.
2.  **Configure Build Settings:**
    *   Netlify should automatically detect it's a Next.js project using the `@netlify/plugin-nextjs`.
    *   If manual configuration is needed, or to verify, use:
        *   **Build command:** `npm run build`
        *   **Publish directory:** `.next`
    *   The `netlify.toml` file in the root directory provides these settings.
3.  **Environment Variables:**
    *   In the Netlify UI (Site settings > Build & deploy > Environment), add any necessary environment variables (e.g., `NEXT_PUBLIC_PORT` if you need to override the default).
4.  **Deploy:** Trigger a deploy manually or push to your connected Git branch.
