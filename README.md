# cms

## Installation

1. Place provided .env file in the root directory, next to docker-compose.yml
2. Run `docker-compose up --build`

Frontend URL: http://localhost:3000
Backend URL: https://localhost:5001

## macOS configuration

- In docker-compose.yml uncomment two currently commented lines with `platform: linux/amd64`

## Known issues

- If backend has not started, try to restart cms-backend-1 container manually
