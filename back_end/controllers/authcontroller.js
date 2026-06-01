const {User,validateUser}=require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mysecretkey"; 

module.exports.signUp=async (req,res)=>{
   //console.log("Route hit");
   //console.log(req.body);
   let { username, email, password } = req.body;
   const { error } = validateUser(req.body);

    if(error){
    return res.status(400).json({
        message: error.details[0].message
    });
   }

   //continue to signup logic
    const existingUser = await User.findOne({ email });
    if(existingUser){
      return res.status(400).json({
        message:"Email already registered"
     });
   }   

   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new User({
   username,
   email,
   password: hashedPassword
  });
  await newUser.save();
  return res.status(201).json({
   message:"User created successfully"
});
  
}

module.exports.login = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found"
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }

   const token = jwt.sign(
  {
    userId: user._id,
    email: user.email
  },
  JWT_SECRET,
  {
    expiresIn: "1d"
  }
);
    
  return res.status(200).json({
    message: "Login Successful",
    token
  });
};

module.exports.profile = async (req, res) => {

  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json({
    username: user.username,
    email: user.email
  });

};