install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

scraper-build:
	cd web_scraper && go build -o scraper .

scraper-run:
	cd web_scraper && ./scraper

scraper: scraper-build scraper-run

test-redis:
	redis-cli ping

help:
	@echo "Makefile commands:"
	@echo "  install:     Install dependencies."
	@echo "  dev:         Run the website in development mode."
	@echo "  build:       Build the website for production."
	@echo "  start:       Start the production server."
	@echo "  scraper-build: Build the scraper application."
	@echo "  scraper-run: Run the scraper application."
	@echo "  scraper:     Build and run the scraper application."
	@echo "  test-redis:  Test the connection to Redis."
	@echo "  help:        Show this help message."
	@echo "  all:         Install dependencies, run scraper, then run dev"

all: install scraper dev