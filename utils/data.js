import { User, Thought } from '../models/index.js'

const users = [
  { username: "Schumi", email: "schumi@example.com" },
  { username: "Alonso", email: "alonso@example.com" },
  { username: "Raikkonen", email: "raikkonen@example.com" },
  { username: "Hamilton", email: "hamilton@example.com" },
  { username: "Button", email: "button@example.com" },
  { username: "Vettel", email: "vettel@example.com" },
  { username: "Rosberg", email: "rosberg@example.com" },
]

const thoughts = [
  {
    thoughtText: "Just won my second championship! Feeling grateful and motivated to continue pushing for more. #ChampionAgain",
    username: "Alonso",
    reactions: [],
  },
  {
    thoughtText: "It's been an amazing journey! Two championships under my belt and more to come. #IceMan",
    username: "Raikkonen",
    reactions: [],
  },
  {
    thoughtText: "Three consecutive championships! Couldn't have done it without the incredible team and fans. #Driven",
    username: "Vettel",
    reactions: [],
  },
];

const reactions = [
  { reactionBody: "Congratulations, Fernando!", username: "Schumi" },
  { reactionBody: "Well done, Kimi!", username: "Hamilton" },
  { reactionBody: "Impressive, Seb!", username: "Button" },
  { reactionBody: "Amazing achievement!", username: "Webber" },
  { reactionBody: "Great job!", username: "Massa" },
  { reactionBody: "You're unstoppable!", username: "Rosberg" },
  { reactionBody: "Incredible!", username: "Kubica" },
];

const friendships = [
  { username: 'Schumi', friends: ['Alonso', 'Massa', 'Raikkonen'] },
  { username: 'Alonso', friends: ['Schumi', 'Button', 'Hamilton'] },
  { username: 'Raikkonen', friends: ['Vettel', 'Massa', 'Schumi'] },
  { username: 'Hamilton', friends: ['Alonso', 'Button', 'Rosberg'] },
  { username: 'Button', friends: ['Alonso', 'Hamilton'] },
  { username: 'Vettel', friends: ['Raikkonen'] },
  { username: 'Massa', friends: ['Schumi', 'Raikkonen'] },
  { username: 'Rosberg', friends: ['Hamilton'] },
];

export async function seedUsers() {
  try {
    // Create users
    await User.insertMany(users);

    // Add friends based on relationships
    for (const friendship of friendships) {
      const user = await User.findOne({ username: friendship.username });
      if (!user) {
        console.error(`User '${friendship.username}' not found.`);
        continue; // Skip this friendship if user not found
      }
      user.friends = await User.find({ username: { $in: friendship.friends } }).select('_id');
      await user.save();
    }

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

export async function seedThoughts() {
  try {
    for (const thoughtData of thoughts) {
      const user = await User.findOne({ username: thoughtData.username });
      if (!user) {
        console.error(`User '${thoughtData.username}' not found.`);
        continue;
      }

      // Create the thought
      const thought = await Thought.create({
        ...thoughtData,
        username: user._id // Assign the user's _id as the username
      });

      // Find reactions for this thought's username
      const thoughtReactions = reactions.filter(reaction => reaction.username === thoughtData.username);
      if (thoughtReactions.length > 0) {
        // Add reactions to the thought
        thought.reactions = thoughtReactions;
        await thought.save();
      }
    }

    console.log('Thoughts and reactions seeded successfully');
  } catch (error) {
    console.error('Error seeding thoughts and reactions:', error);
  }
}

