# Infinite Loading React Demo

This project is a mini-app that demonstrates how to implement infinite loading in React using a JSON placeholder server and the Intersection Observer API.

## Overview

This application showcases a modern approach to loading large datasets in a React application. It uses infinite scrolling to dynamically load more content as the user scrolls down the page, providing a smooth and efficient user experience.

## Features

- Infinite scrolling implementation
- React hooks for state management and side effects
- Integration with a JSON placeholder API
- Intersection Observer API for efficient scroll detection
- Responsive grid layout for photo display

## Tech Stack

- React
- TypeScript
- Vite
- Axios for API requests
- JSON Server (for the backend mock API)

## Project Structure

The project is divided into two main parts:

1. Client (React frontend)
2. API (JSON Server backend)

### Key Components

- `useInfinitePhotos` hook: Manages the state and logic for fetching photos
- `PhotoList` component: Renders the list of photos with infinite scrolling
- JSON Server: Provides a mock REST API for serving photo data

## Setup and Installation

1. Clone the repository
2. Install dependencies for both client and API:
```
cd client && yarn
cd ../api && yarn
```

3. Start the JSON Server (API):
```
cd ../api && yarn dev
```

4. In a new terminal, start the React app:
```
cd ../client && yarn dev
```

5. Open your browser and navigate to `http://localhost:5173` (or the port Vite assigns)

## How It Works


This hook utilizes the Intersection Observer API to detect when the last loaded image comes into view, triggering a new API call to fetch the next batch of photos.

The `PhotoList` component renders the photos in a responsive grid layout and applies the infinite scrolling logic.

## API

The backend is simulated using JSON Server, which provides a full fake REST API. The `db.json` file contains the photo data used by the application.

## Styling

The application uses classic CSS for styling, with a focus on creating a responsive grid layout for the photos.
