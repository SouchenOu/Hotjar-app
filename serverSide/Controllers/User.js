import Site from '../Modules/Site.js';
import Surveys from '../Modules/Surveys.js';
import Users from '../Modules/Users.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({});
    res.status(200).json({ status: 'success', data: users });
  } catch (err) {
    next(err);
  }
};

export const getotherUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await Users.find({});
    const userfilter = users.filter((elem) => elem._id !== id);
    res.status(200).json({ data: userfilter });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, role } = req.body;

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (role) user.role = role;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      role: updatedUser.role,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: 'failure', message: 'User not found' });
    }

    await Site.deleteMany({ user: id });

    await Surveys.deleteMany({ createdUser: id });

    await Site.updateMany(
      { 'members.user': id },
      { $pull: { members: { user: id } } }
    );

    await Users.deleteOne({ _id: id });

    return res.status(200).json({
      status: 'success',
      message: 'Account and all associated data deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({
      status: 'failure',
      message: 'An error occurred while deleting the account',
    });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const searchByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).send({ message: 'Email is required' });

    const users = await Users.find({ email: { $regex: email, $options: 'i' } });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Server error' });
  }
};
