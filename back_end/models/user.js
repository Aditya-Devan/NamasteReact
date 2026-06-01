const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().trim().required(),

    email: Joi.string().email().trim().required(),

    password: Joi.string().min(6).required(),
  });

  return schema.validate(user);
};

module.exports = {
  User,
  validateUser,
};