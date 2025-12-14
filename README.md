# Sociopedia - MERN Stack Social Media App

## Features
- User Authentication (Login/Register) with JSON Web Tokens (JWT).
- Image Uploads for Profile Picture and Posts (Multer).
- Dark Mode toggle.
- Create Posts with Images.
- Like Posts.
- Friend List (Add/Remove Friends).
- Responsive Design (TailwindCSS).

## Setup

### Backend (Server)
1. Navigate to the `server` directory.
   ```bash
   cd server
   ```
2. Install dependencies (already installed).
   ```bash
   npm install
   ```
3. Start the server.
   ```bash
   npm run start
   # or for development
   npm run dev
   ```
   Server runs on `http://localhost:3001`.

### Frontend (Client)
1. Navigate to the `client` directory.
   ```bash
   cd client
   ```
2. Install dependencies (already installed).
   ```bash
   npm install
   ```
3. Start the development server.
   ```bash
   npm run dev
   ```
   Client runs on `http://localhost:5173`.

## Environment Variables
- **Server**: `.env` file is pre-configured with `MONGO_URL` (local) and `JWT_SECRET`.
- **Client**: `vite.config.js` and `tailwindcss` are configured.

## Usage
1. Open the client URL.
2. Register a new user (upload a picture).
3. Login with credentials.
4. Create posts, like posts, add friends.
