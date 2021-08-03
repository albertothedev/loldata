# Loldata

Stats and analytics app for League of Legends built with React and Node.js (Express). TypeScript is enabled globally. SCSS is used for styling, Redux for state management, React Router for route handling, and Docker for local development.

## Getting started

1. Installs dependencies on frontend and backend (/ui and /api).

   ```sh
   npm run install
   ```

2. Builds the images for the frontend and the backend and creates two containers from them.

   ```sh
   npm run start
   ```

## Environment variables

Specified in /.env.development.

- **LOLDATA_PORT**: Port the backend will run on.
- **LOLDATA_API_KEY**: Riot API key.
- **REACT_APP_LOLDATA_API_URL**: Backend URL.

## Other commands

- Removes images and containers.

  ```sh
  npm run stop
  ```

- Runs **stop** and **start** consecutively.

  ```sh
  npm run restart
  ```
