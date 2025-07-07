import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose"; 
import Register from './Routes/Register.js';

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
app.use(cors({
  origin: 'https://686bd4dabee7af0008d469d6--rainbow-rabanadas-c2bfce.netlify.app', // <-- your frontend URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors({
  origin: 'https://686bd4dabee7af0008d469d6--rainbow-rabanadas-c2bfce.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/Register", Register);

// Home Route
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(500).json({ error: errorMessage });
});

// 404 Route
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
