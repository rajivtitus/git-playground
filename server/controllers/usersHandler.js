//Import Packages
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Import Model
import User from "../models/User.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist!" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { email: savedUser.email, id: savedUser._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: savedUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
    console.log(error);
  }
};
