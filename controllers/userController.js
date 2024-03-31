import { User } from '../models/index.js';

// Get all Users
export async function getUsers(req, res) {
  try {
    const users = await User.find();

    if(!users) {
      return res.status(404).json({ message: 'No users found' })
    }
    res.status(200).json(users);

  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// Get a single user
export async function getUserbyId(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id })
      .select('-__v');
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// create a new user
export async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete a user and remove them from the course
export async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' });
    }

    res.status(200).json({ message: 'user successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// // Add an assignment to a user
export async function addFriend(req, res) {
  try {
    const newFriend = req.body.id
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: newFriend } },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// // Remove assignment from a user
export async function removeFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

