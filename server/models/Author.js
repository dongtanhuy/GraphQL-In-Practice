import mongoose from 'mongoose';

const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yearOfBirth: {
    type: Number,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
    defaultValue: true, // TRUE = MALE, FALSE = FEMALE
  }
});


export default mongoose.model('authors', authorSchema);