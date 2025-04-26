install:
	npm install

dev:
	npm run dev

up:
	podman compose --env-file web_scraper/.env up -d 

scraper-deps:
	cd web_scraper && go mod tidy
	cd web_scraper && go mod download

build:
	npm run build

start:
	npm run start

scraper-build:
	cd web_scraper && go build -o scraper .
scraper-build-docker:
	cd web_scraper && podman build -t scraper-image .

scraper-run:
	cd web_scraper && ./scraper
scraper-run-docker: scraper-build-docker
	podman run --network=host scraper-image

scraper: scraper-deps scraper-build scraper-run

scraper-docker: scraper-build-docker scraper-run-docker

test-redis:
	podman run -d --name redis-test -p 6379:6379 redis:9-alpine

help:
	@echo "Makefile commands:"
	@echo "  install:     Install dependencies."
	@echo "  dev:         Run the website in development mode."
	@echo "  build:       Build the website for production."
	@echo "  start:       Start the production server."
	@echo "  scraper-build: Build the scraper application."
	@echo "  scraper-build-docker: Build the scraper docker application."
	@echo "  scraper-run: Run the scraper application."
	@echo "  scraper-run-docker: Run the scraper docker application."
	@echo "  scraper:     Build and run the scraper application."
	@echo "  scraper-docker: Build and run the scraper application in docker."
	@echo "  test-redis:  Run a redis container to test."
	@echo "  help:        Show this help message."
	@echo "  up:        Starts docker-compose and open localhost:9002."
	@echo "  all:         Install dependencies, run scraper, then run dev"

all: install scraper dev