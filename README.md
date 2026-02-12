# Crypto Price Alert System

A full-stack MERN application that allows users to track cryptocurrency prices and receive alerts when specific targets are met. The system features a modern, premium UI with role-based access control (RBAC).

## Features

-   **User Authentication**: Secure registration and login with JWT and Email validation.
-   **Role-Based Access Control (RBAC)**:
    -   **Admin**: Full access. Can login as 'User' to view the app from a user's perspective.
    -   **User**: Restricted access. Can only manage their own alerts.
-   **Real-time Dashboard**:
    -   View active alerts in a glassmorphism grid layout.
    -   Create new price alerts (Above/Below condition).
    -   Delete alerts (Admins can delete any alert).
-   **Design**: Premium UI using **Tailwind CSS**, Glassmorphism, and custom animations.
-   **Security**: Password hashing (Bcrypt), JWT authorization, and protected routes.

## Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Axios, React Router.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB (Atlas or Local).
-   **Tools**: Postman (API Testing), Git.

## Setup Instructions

### Prerequisites
-   Node.js (v14+)
-   MongoDB (Running locally or Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository_url>
cd assignment
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=anubhav
ADMIN_EMAIL=anubhav@example.com
ADMIN_PASSWORD=warthundergod
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

Access the app at `http://localhost:5173`.

## Scaling & Architecture
See [SCALABILITY.md](./SCALABILITY.md) for details on how this system can be scaled for millions of users.

## API Documentation
See [API_DOCS.md](./API_DOCS.md) for a list of available endpoints.
