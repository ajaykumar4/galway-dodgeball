# Use official Go 1.22 image
FROM golang:1.22

WORKDIR /app

# Copy go.mod and go.sum first for caching
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copy the rest of the app
COPY . .

# Build binary
RUN go build -o scraper . 

# Run the scraper
CMD ["./scraper"]
