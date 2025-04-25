# Use official Go 1.24.2 image
FROM golang:1.24.2

WORKDIR /app

# Copy go.mod and go.sum first for caching
COPY go.mod ./
RUN go mod tidy

# Copy the rest of the app
COPY . .

# Build binary
RUN go build -o scraper .

# Run the scraper
CMD ["./scraper"]
