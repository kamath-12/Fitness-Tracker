# Simple Fitness Tracker

A clean, simple full-stack fitness tracking application.

## Tech Stack

- **Frontend**: React.js + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT + bcrypt
- **API Communication**: Axios

## Features

- User Registration & Login
- Dashboard with workout stats
- Profile management
- Add/Edit/Delete workouts
- Set and track fitness goals
- Progress tracking with visual indicators

## Project Structure

```
fitness-tracker-simple/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Workout.js
│   │   └── Goal.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── workoutRoutes.js
│   │   └── goalRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── workoutController.js
│   │   └── goalController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── database.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── client/
    └── src/
        ├── components/
        │   └── Navbar.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── Profile.jsx
        │   ├── Workouts.jsx
        │   └── Goals.jsx
        ├── services/
        │   └── api.js
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── package.json
        ├── vite.config.js
        └── index.html
```

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account with cluster configured

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

4. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to client directory (in a new terminal):
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)
- PUT `/api/auth/profile` - Update user profile (protected)

### Workouts
- POST `/api/workouts` - Create workout (protected)
- GET `/api/workouts` - Get all workouts (protected)
- GET `/api/workouts/:id` - Get single workout (protected)
- PUT `/api/workouts/:id` - Update workout (protected)
- DELETE `/api/workouts/:id` - Delete workout (protected)

### Goals
- POST `/api/goals` - Create goal (protected)
- GET `/api/goals` - Get all goals (protected)
- GET `/api/goals/:id` - Get single goal (protected)
- PUT `/api/goals/:id` - Update goal (protected)
- PUT `/api/goals/:id/progress` - Update goal progress (protected)
- DELETE `/api/goals/:id` - Delete goal (protected)

## Usage

1. Open http://localhost:3000 in your browser
2. Register a new account
3. Login with your credentials
4. Start tracking your workouts and goals!

## Database

This application uses MongoDB Atlas for cloud-based data storage. Make sure your MongoDB Atlas cluster is accessible and your IP is whitelisted in the Atlas security settings.
