# Clean Architecture Express

A ready-to-use Express starter built with clean architecture principles.

Released under the MIT License.

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

The server will run on `http://localhost:3000` by default.

## Features

- Clean architecture folder structure
- Express 5 starter setup
- Centralized logging with `pino`
- HTTP request logging with `pino-http`
- Global error handling
- Basic request validation for the sample `users` module
- Graceful shutdown handling for `SIGINT` and `SIGTERM`

## Project Structure

```txt
src/
  application/
  config/
  domain/
  infrastructure/
  interfaces/
  shared/
```

The sample `users` module is wired end-to-end through entity, use case, repository, controller, and route layers.

## Default Endpoints

- `GET /`
- `GET /health`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

## Available Scripts

- `npm run dev` starts the app with `nodemon`
- `npm start` starts the app with Node.js
- `npm run check` validates the server entry file syntax

## Environment Variables

Copy `.env.example` to `.env` and adjust the values if needed:

```env
PORT=3000
APP_NAME=clean-architecture-express
NODE_ENV=development
LOG_LEVEL=info
```

## Notes

- The sample `users` feature uses an in-memory repository.
- Data will be reset every time the server restarts.
- You can replace the in-memory repository with a database implementation later without changing the core use cases.
- Routes are intentionally exposed without version prefixes such as `/v1` to keep the URL surface simpler as the app evolves.
- In development, logs are formatted with `pino-pretty`.
- Validation is intentionally minimal and can be replaced with a dedicated schema library later.

## Logging

This starter includes:

- startup logs when the server begins listening
- structured request logs for every HTTP request
- warning logs for expected application errors
- error logs for unexpected failures
- shutdown logs for process termination signals

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for license details.
