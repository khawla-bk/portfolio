# Use the official Golang image to create a build artifact.
FROM golang:1.15 as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy everything from the current directory to the PWD(Present Working Directory) inside the container
COPY . .

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Build the Go app
RUN go build -o portfolio .

# Start a new stage from scratch
FROM alpine:latest  

WORKDIR /root/

# Copy the Pre-built binary file from the previous stage
COPY --from=builder /app/portfolio .

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./portfolio"]
