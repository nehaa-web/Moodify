const userModel = require("../models/user.model");
const blacklistModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const redis = require("../config/cache")

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyRegistered = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (isAlreadyRegistered) {
    return res.status(409).json({
      message:
        isUserAlreadyExist.email == email
          ? "Email already exist"
          : "Username already exist",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3d" },
  );

  res.cookie("token".token);

  res.status(201).json({
    message: "User Registored succesfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (!user) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registored succesfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}

async function getMe(req, res) {
  const user = await userModle.findById(req.user.id);

  res.status(200).json({
    message: "User fetched succesfully",
    user,
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");

  // await blacklistModel.create({
  //   token,
  // });

  await redis.set( token , Data.now().toString(), "EX" , 60 * 60)

  res.status(200).json({
    message : "logout succesfully"
  })
}

module.exports = { registerUser, loginUser, getMe, logoutUser };
