const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userSchema } = require("../utils/validate");

const SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(409).json({ message: "Email in use" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });

  res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
  });
};

exports.login = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Email or password is wrong" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Email or password is wrong" });

  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  user.token = token;
  await user.save();

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};



exports.logout = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(401).json({ message: 'Not authorized' });

  user.token = null;
  await user.save();

  res.status(204).send(); // No Content
};

exports.current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};


exports.updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const allowed = ["starter", "pro", "business"];

  if (!allowed.includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription value" });
  }

  req.user.subscription = subscription;
  await req.user.save();

  res.json({ email: req.user.email, subscription });
};
