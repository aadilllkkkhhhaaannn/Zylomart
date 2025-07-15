// // const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");
// const validator = require("validator");

// // Valid email

// const isValidEmail = (email) => {
//   if (!validator.isEmail(email)) return false;
//   const allowedDomains = ["gmail.com"];
//   const domain = email.split("@")[1];
//   return allowedDomains.includes(domain);
// };

// // register
// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   const trimmedEmail = email.trim();
//   if (!isValidEmail(trimmedEmail)) {
//     return res.status(400).json({ error: "Invalid email format" });
//   }
//   try {
//     const checkUser = await User.findOne({ email: isValidEmail });

//     if (checkUser)
//       return res.json({
//         success: false,
//         message: "User Already exist!",
//       });

//     // const hashPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({
//       userName,
//       // email,
//       email: trimmedEmail,
//       // password: hashPassword,
//       password,
//     });

//     await newUser.save();
//     // const newUser = new User({
//     //   userName,
//     //   email,
//     //   password,
//     //   createdAt: new Date(), // Ensure createdAt is added
//     // });
//     // await newUser.save();

//     res.status(200).json({
//       success: true,
//       message: "Registration Successfully!",
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

// // login
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const checkUser = await User.findOne({ email });

//   if (!checkUser)
//     return res.json({
//       success: false,
//       message: "User doesn't exist",
//     });

//   // const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
//   const checkPasswordMatch = (password, checkUser.password);

//   if (!checkPasswordMatch)
//     return res.json({
//       success: false,
//       message: "Incorrect password",
//     });

//   // generate token

//   const token = jwt.sign(
//     {
//       id: checkUser._id,
//       role: checkUser.role,
//       email: checkUser.email,
//       userName: checkUser.userName,
//     },
//     "CLIENT_SECRET_KEY",
//     { expiresIn: "60m" }
//   );

//   // HTTP cookie

//   res.cookie("token", token, { httpOnly: true, secure: false }).json({
//     success: true,
//     message: "Logged in successfully!",
//     user: {
//       email: checkUser.email,
//       // email : checkUser.trimmedEmail,
//       role: checkUser.role,
//       id: checkUser._id,
//     },
//   });

//   try {
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Some error occured",
//     });
//   }
// };

// // logout

// const logoutUser = (req, res) => {
//   res.clearCookie("token").json({
//     success: true,
//     message: "Logged out Successfully!",
//   });
// };

// // auth-middleware

// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized user!",
//     });

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized user!",
//     });
//   }
// };

// module.exports = { registerUser, loginUser, logoutUser, authMiddleware };

// 2
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// Valid email
const isValidEmail = (email) => {
  if (!validator.isEmail(email)) return false;
  const allowedDomains = ["gmail.com"];
  const domain = email.split("@")[1];
  return allowedDomains.includes(domain);
};

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const trimmedEmail = email.trim();
  if (!isValidEmail(trimmedEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  try {
    const checkUser = await User.findOne({ email: isValidEmail });

    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exist!",
        // user: savedUser,
      });

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      // email,
      email: trimmedEmail,
      password: hashPassword,
      // password,
    });

    await newUser.save();
    // const newUser = new User({
    //   userName,
    //   email,
    //   password,
    //   createdAt: new Date(), // Ensure createdAt is added
    // });
    // await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration Successfully!",
      // user: newUser,

    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email });

  if (!checkUser)
    return res.json({
      success: false,
      message: "User doesn't exist",
    });

  const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
  // const checkPasswordMatch = (password, checkUser.password);

  if (!checkPasswordMatch)
    return res.json({
      success: false,
      message: "Incorrect password",
    });

  // generate token
  const token = jwt.sign(
    {
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
      userName: checkUser.userName,
    },
    "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }
  );

  // HTTP cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Change to secure on production (https)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Cross-origin settings for production
  }).json({
    success: true,
    message: "Logged in successfully!",
    user: {
      email: checkUser.email,
      role: checkUser.role,
      id: checkUser._id,
    },
  });

  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out Successfully!",
  });
};

// auth-middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
