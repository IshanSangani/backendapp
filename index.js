const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://ishansangani:Ishan123<password>@cluster0.naowgnd.mongodb.net/')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// User Model
const User = mongoose.model('User', UserSchema);

app.use(bodyParser.json());

// Signup Route
app.post('/signup', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
});

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server started on port ${port}`));
