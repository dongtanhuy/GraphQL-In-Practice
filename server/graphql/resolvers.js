import Author from '../models/Author';
import pubsub from './pubsub';
import mongoose from 'mongoose';

const AUTHOR_CREATED = 'AUTHOR_CREATED';
const AUTHOR_UPDATED = 'AUTHOR_UPDATED';

const { ObjectId } = mongoose.Types;
const resolvers = {
  Query: {
    authors: async () => {
      try {
        const authors = await Author.find();
        return authors;
      } catch (err) {
        console.log('ERROR-authors');
        console.log(err.message);
        throw new Error(err.message);
      }
    },
    author: async (root, {id}) => {
      try {
        const author = await Author.findOne({_id: ObjectId(id)});
        return author;
      } catch (err) {
        console.log('ERROR-author');
        console.log(err.message);
        throw new Error(err.message);
      }
    }
  },
  Mutation: {
    createAuthor: async (root, { name, yearOfBirth, gender = true }) => {
      try {
        const newAuthor = await Author.create({
          name,
          yearOfBirth,
          gender
        });
        pubsub.publish(AUTHOR_CREATED,{ authorCreated: newAuthor});
        return newAuthor
      } catch (err) {
        console.log('ERROR-createAuthor');
        console.log(err.message);
        throw new Error(err.message);
      }
    },
    updateAuthor: async (root, {id, newName, newYearOfBirth, newGender }) => {
      try {
        const author = Author.findById(id);
        if (!author) {
          throw new Error('Author not found');
        }
        const updatedAuthor = await Author.findOneAndUpdate({_id:id}, {
          name: newName,
          yearOfBirth: newYearOfBirth,
          gender: newGender,
        });
        pubsub.publish(AUTHOR_UPDATED,{ authorUpdated: {
          id,
          name: newName,
          yearOfBirth: newYearOfBirth,
          gender: newGender,
        } });
        return {
          id,
          name: newName,
          yearOfBirth: newYearOfBirth,
          gender: newGender,
        };
      } catch (err) {
        console.log('ERROR-updateAuthor');
        console.log(err.message);
        throw new Error(err.message);
      }
    },
    deleteAuthor: async (root, { id }) => {
      try {
        const author = Author.findById(id);
        if (!author) {
          throw new Error('Author not found');
        }
        await Author.findOneAndRemove({_id: id});
        return id;
      } catch (err) {
        console.log('ERROR-updateAuthor');
        console.log(err.message);
        throw new Error(err.message);
      }
    }
  },
  Subscription: {
    authorCreated: {
      subscribe: () => pubsub.asyncIterator(AUTHOR_CREATED),
    },
    authorUpdated: {
      subscribe: () => pubsub.asyncIterator(AUTHOR_UPDATED),
    }
  }
}
export default resolvers;
