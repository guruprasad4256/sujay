const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your user collection
const userSchema = new mongoose.Schema({
  email: String,
});

const User = mongoose.model('User', userSchema);

// Route to check if email exists
app.get('/api/check-email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking email existence:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
