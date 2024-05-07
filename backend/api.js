const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

//making mongodb connection
mongoose.connect("mongodb+srv://dbUser:1122secret@clusteruser.7hh7zjh.mongodb.net/usersDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// Endpoint to get all users
  app.get("/getUsers", async (req, res) => {
    try {
        // Find all users in the database
        const result = await UserModel.find({});
        // Send the users as JSON response
        res.json(result);
    } catch (err) {
        // If an error occurs, send a 500 (Internal Server Error) response
        // and include the error message in the response body
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to create a new user
app.post("/createUser", async (req, res) => {
  const { firstname, lastname, email, actions } = req.body;
  try {
      const newUser = new UserModel({ firstname, lastname, email , actions });
      await newUser.save();
      res.json(newUser);
  } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
  }
});

// Endpoint to delete a user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    // Extract user ID from request parameters
    const userId = req.params.id;
    // Find the user by ID and delete it
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    // If user not found
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    // If user deleted successfully
    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    // If an error occurs, send a 500 (Internal Server Error) response
    res.status(500).json({ error: error.message });
  }
});

// Fetch a specific user by ID
app.get("/getUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific user by ID
app.put("/editUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstname, lastname, email, actions } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      firstname,
      lastname,
      email,
      actions
    }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {});