import { User, Thought } from '../models/index.js';

// Get all thoughts
export async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();

    if(!thoughts) {
      return res.status(404).json({ message: 'No thoughts found' })
    }
    res.status(200).json(thoughts);

  } catch (err) {
    return res.status(500).json(err);
  }
}

// Get a single Thought
export async function getThoughtbyId(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.id })
      .select('-__v');
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' })
    }
    res.status(200).json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// create a new Thought
export async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    const newThought = thought._id

    await User.findOneAndUpdate(
      { username: req.body.username },
      { $addToSet: { thoughts: newThought } },
      { runValidators: true, new: true }
    )

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Updates a user
export async function editThought(req, res) {
  try {
    const update = req.body
    const user = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: update },
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

// Delete a thought
export async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.id });

    if (!thought) {
      return res.status(404).json({ message: 'No such Thought exists' });
    }

    res.status(200).json({ message: 'Thought successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
}

// Add an reaction to a thought
export async function addReaction(req, res) {
  try {
    const newReaction = {
      reactionBody: req.body.reactionBody,
      username: req.body.username
    }

    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: newReaction } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

// Remove reaction from a Thought
export async function removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res
        .status(404)
        .json({ message: 'No thought found with that ID :(' });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
