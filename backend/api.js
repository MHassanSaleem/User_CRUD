const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users")

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
    // Extract user data from the request body
    const user = req.body;
    // Create a new user instance using the UserModel schema
    const newUser = new UserModel(user);
    try {
        // Save the new user to the database
        await newUser.save();
        // Send the created user as JSON response
        res.json(newUser);
    } catch (err) {
        // If an error occurs, send a 500 (Internal Server Error) response
        // and include the error message in the response body
        res.status(500).json({ error: err.message });
    }
  });


app.listen(3001, () => {
    console.log("going well");
});
