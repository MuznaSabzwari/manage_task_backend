import RegistrationModel from '../Model/Registration.js';
import bcrypt from 'bcryptjs';



// Get one user by ID
export const getOneRegisterUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await RegistrationModel.findById(userId).exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Add/register a new user
export const addRegisterUser = async (req, res, next) => {
  const { Name, Email, Password, Contact } = req.body;

  try {
    const existingUser = await RegistrationModel.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!Name || !Email || !Password || Password.length < 6 || !Contact || Contact.length !== 11) {
      return res.status(400).json({ success: false, message: "Invalid input fields" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await RegistrationModel.create({
      Name,
      Email,
      Password: hashedPassword,
      Contact
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
    const { Email, Password } = req.body;
  
    try {
      const user = await RegistrationModel.findOne({ Email });
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(Password, user.Password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
  
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          email: user.Email,
          password: user.Password // (hashed password)
        }
      });
    } catch (error) {
      next(error);
    }
  };
  
// Add task to a user
export const addTaskToUser = async (req, res, next) => {
    const { userId } = req.params;
    const { title, description } = req.body;
  
    try {
      const user = await RegistrationModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.tasks.push({ title, description });
      await user.save();
  
      res.status(201).json({ success: true, message: "Task added", tasks: user.tasks });
    } catch (error) {
      next(error);
    }
  };
  
  // Get all tasks of a user
  export const getUserTasks = async (req, res, next) => {
    const { userId } = req.params;
  
    try {
      const user = await RegistrationModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ success: true, tasks: user.tasks });
    } catch (error) {
      next(error);
    }
  };
  
  //  Delete a task by index
  export const deleteUserTask = async (req, res, next) => {
    const { userId, taskIndex } = req.params;
  
    try {
      const user = await RegistrationModel.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (taskIndex < 0 || taskIndex >= user.tasks.length) {
        return res.status(400).json({ success: false, message: "Invalid task index" });
      }
  
      user.tasks.splice(taskIndex, 1);
      await user.save();
  
      res.status(200).json({ success: true, message: "Task deleted", tasks: user.tasks });
    } catch (error) {
      next(error);
    }
  };
  

  // Update task by index
export const updateUserTask = async (req, res, next) => {
  const { userId, taskIndex } = req.params;
  const { title, description } = req.body;

  try {
    const user = await RegistrationModel.findOne({ _id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (taskIndex < 0 || taskIndex >= user.tasks.length) {
      return res.status(400).json({ message: "Invalid task index" });
    }

    // Update task fields
    user.tasks[taskIndex].title = title || user.tasks[taskIndex].title;
    user.tasks[taskIndex].description = description || user.tasks[taskIndex].description;

    await user.save();

    res.status(200).json({ success: true, message: "Task updated", tasks: user.tasks });
  } catch (error) {
    next(error);
  }
};
