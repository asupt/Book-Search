const { User } = require('../models');
const { AuthenticationError } = require('@apollo/server'); // Updated import
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    User: async (parent, { userId }) => User.findOne({ _id: userId }),
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new AuthenticationError('No user found with this email address');
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) throw new AuthenticationError('Incorrect password');
      const token = signToken(user);
      return { token, user };
    },saveBook: async (parent, { book }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
      } catch (err) {
        throw new Error(`Error saving book: ${err.message}`);
      }
    },

    deleteBook: async (parent, { bookId }, context) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');

      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
      } catch (err) {
        throw new Error(`Error deleting book: ${err.message}`);
      }
    },
    
  },
};

module.exports = resolvers;
