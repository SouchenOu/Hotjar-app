import Users from '../Modules/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CreateError from '../utils/error.js';
import nodemailer from 'nodemailer';

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe';

let verificationCodeStore = {};

export const register = async (req, res) => {
  try {
    const { email, password, username, verificationCode } = req.body;

    const user = await Users.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ status: 'failure', message: 'User already exists' });
    }

    if (verificationCodeStore[email] !== parseInt(verificationCode)) {
      return res
        .status(400)
        .json({ status: 'failure', message: 'Invalid verification code' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Users({
      ...req.body,
      password: hashedPassword,
      username: username,
    });

    // Generate a token
    const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
      expiresIn: '90d',
    });
    await newUser.save();

    delete verificationCodeStore[email];

    return res.status(200).json({
      status: 'success',
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ status: 'failure', message: 'User not exist ' });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: 'failure', message: 'Wrong password' });
    }

    const token = jwt.sign({ _id: user._id }, 'secretkey123', {
      expiresIn: '90d',
    });
    res.status(200).json({
      status: 'success',
      token,
      message: 'Logged in succefully',
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const ForgotPassword = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return next(new CreateError('User not found', 404));

    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, _id: user._id }, secret, {
      expiresIn: '90d',
    });
    const link = `https://pro1-ubq1.onrender.com/auth/reset-password/${user._id}/${token}`;

    await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'soukainaouchenuai@gmail.com',
        pass: 'ktteypikemdcbkqq',
      },
    });
    const message = {
      from: 'soukainaouchenuai@gmail.com',
      to: req.body.email,
      subject: 'Reset your password',
      text: `Click the link to reset your password: ${link}`,
    };

    transporter.sendMail(message).then((info) => {
      return res.status(201).json({
        msg: 'You should receive an email',
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const Olduser = await Users.findOne({ _id: id });
  if (!Olduser) {
    return res.json({ status: 'User not exist' });
  }
  const secret = JWT_SECRET + Olduser.password;

  try {
    const verify = jwt.verify(token, secret);
    res.render('index', { email: verify.email, status: 'Not verified' });
  } catch (err) {
    next(err);
  }
};

export const resetLaPassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const Olduser = await Users.findOne({ _id: id });

  if (!Olduser) {
    return res.json({ status: 'User not exist' });
  }

  const secret = JWT_SECRET + Olduser.password;

  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Users.updateOne(
      { _id: id },
      { $set: { password: encryptedPassword } }
    );

    res.render('index', { email: verify.email, status: 'verified' });
  } catch (err) {
    next(err);
  }
};

export const sendVerificationCode = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const user = await Users.findOne({ email: newEmail });
    if (user) {
      return res
        .status(400)
        .json({ status: 'failure', message: 'Email alrighdy exist' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    verificationCodeStore[newEmail] = verificationCode;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'soukainaouchenuai@gmail.com',
        pass: 'ktteypikemdcbkqq',
      },
    });

    await transporter.sendMail({
      from: 'soukainaouchenuai@gmail.com',
      to: newEmail,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    });

    res
      .status(200)
      .json({ status: 'success', message: 'Verification code sent' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res
      .status(500)
      .json({ status: 'error', message: 'Failed to send verification code' });
  }
};

export const verifyCodeAndUpdateEmail = async (req, res) => {
  try {
    const { userId, newEmail, verificationCode } = req.body;

    if (verificationCodeStore[newEmail] !== parseInt(verificationCode)) {
      return res
        .status(400)
        .json({ status: 'failure', message: 'Invalid verification code' });
    }

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: 'failure', message: 'User not found' });
    }

    delete verificationCodeStore[newEmail];

    res.status(200).json({
      status: 'success',
      message: 'Email updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

export const ChangePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  try {
    const user = await Users.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
