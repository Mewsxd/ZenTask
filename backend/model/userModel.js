const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    minlength: [1, "Name must be atleast 1 character"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please submit your email"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  //   todos: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Todo",
  //     },
  //   ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
