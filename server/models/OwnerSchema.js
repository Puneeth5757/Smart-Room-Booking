const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const keysecret = "Puneeth@891011121314151617181920"


const ownerSchema = new mongoose.Schema({
  ownername: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6
},
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Hash password before saving
ownerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

// Generate token
ownerSchema.methods.generateAuthtoken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d", 
    });

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    res.status(422).json(error)
  }
};

module.exports = mongoose.model("owners", ownerSchema);