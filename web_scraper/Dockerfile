# Use official Go 1.22 image as builder
FROM golang:1.22 as builder

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum first to cache dependencies
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the binary
RUN CGO_ENABLED=0 go build -o scraper .

