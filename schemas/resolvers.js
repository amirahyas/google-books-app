// graphql/resolvers.js

// Import your database models or any data handling functions
const { User, Book } = require('./models');

const resolvers = {
  Query: {
    // Example query to get all books
    books: async () => {
      try {
        const books = await Book.find();
        return books;
      } catch (error) {
        throw new Error('Error fetching books: ' + error.message);
      }
    },

    // Additional queries can be added here based on your schema
  },

  Mutation: {
    // Example mutation to save a book to a user's account
    saveBook: async (_, { input }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new Error('Authentication required');
      }

      const { title, author, description, image, link } = input;

      try {
        // Create a new book in the database
        const newBook = new Book({
          title,
          author,
          description,
          image,
          link,
          user: context.user.id, // Associate the book with the authenticated user
        });

        // Save the book to the user's account
        await newBook.save();

        // Update the user's savedBooks array
        await User.findByIdAndUpdate(context.user.id, {
          $addToSet: { savedBooks: newBook.id },
        });

        return newBook;
      } catch (error) {
        throw new Error('Error saving book: ' + error.message);
      }
    },

    // Additional mutations can be added here based on your schema
  },
};

module.exports = resolvers;
