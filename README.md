# Task Management Backend

This is the backend API for the Task Management Web App. It is built using Node.js and Express, with MongoDB as the database. It supports user registration, login, and full CRUD operations for managing tasks.

## Features

- User registration
- Add, update, delete, and fetch tasks for each user
- MongoDB for persistent storage

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv
- CORS
- Morgan

## Getting Started

1. Clone the repository:

   git clone <your-backend-repo-url>

2. Install dependencies:

   cd task-management-backend  
   npm install

3. Configure environment variables by creating a `.env` file:

   PORT=3005  
   MONGO_URI=your_mongodb_connection_string

4. Start the backend server:

   npm start

The backend will run on `http://localhost:3005`.

## API Endpoints

- POST /Register/register
- POST /Register/login
- GET /Register/getTasks/:userId
- POST /Register/addTask/:userId
- PUT /Register/updateTask/:userId/:taskIndex
- DELETE /Register/deleteTask/:userId/:taskIndex

## Live API

Add your Render backend live URL here after deployment.
