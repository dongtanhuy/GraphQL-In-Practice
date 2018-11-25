import  mongoose from 'mongoose';
import './graphql';

// Connecting to DB
mongoose.connect('mongodb://127.0.0.1:27017/demoGraphQL', { useNewUrlParser: true })
  .then(() => console.log(`Successfully connect to mongodb`))
  .catch(error => console.log(error));

