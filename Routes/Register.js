import express from "express";
import {
    addRegisterUser,
    getOneRegisterUser,
    loginUser,
    addTaskToUser,
    getUserTasks,
    deleteUserTask,
    updateUserTask
  } from '../Controller/Registration.js';
  

const router = express.Router();

router.get("/registerid/:id", getOneRegisterUser);  // Read one
router.post("/addUsers", addRegisterUser);          // Create

router.post("/login", loginUser);   //login

// CRUD Task
router.post("/addTask/:userId", addTaskToUser);
router.get("/getTasks/:userId", getUserTasks);
router.delete("/deleteTask/:userId/:taskIndex", deleteUserTask); 
router.put("/updateTask/:userId/:taskIndex", updateUserTask);

export default router;
