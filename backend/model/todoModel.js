const mongoose = require("mongoose");
const AppError = require("../utils/appError");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must have a title"],
    minlength: [3, "Todo title must be atleast 3 characters"],
    trim: true,
  },
  // uid: {
  //   type: mongoose.Schema.ObjectId,
  //   required: [true, "Todo must have an id"],
  // },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
// todoSchema.pre('create', async function(next){
//   const todo = await Todo.findById(this.uid);
//   if(!todo){
//     return next(new AppError('Invalid uid', 203))
//   }
//   // this.uid
// })
module.exports = Todo;
