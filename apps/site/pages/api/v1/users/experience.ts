// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('your_database_url', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose model for the Experience collection
const Experience = mongoose.model('Experience', {
  favoriteHero: String,
  role: {
    isCandidate: Boolean,
    isEmployer: Boolean,
    isAdmin: Boolean,
  },
  // Add other fields as needed
});

app.use(express.json());

// Handle POST requests to '/users/experience'
app.post('/users/experience', async (req, res) => {
  try {
    const { favoriteHero, role } = req.body;

    // Save data to MongoDB
    const experience = new Experience({ favoriteHero, role });
    await experience.save();

    res.status(201).json({ message: 'Experience data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
