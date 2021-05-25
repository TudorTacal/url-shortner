import mongoose from 'mongoose';
import { server } from './server';

const PORT: string | number = process.env.PORT || 4000;

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vztwr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose.connect(uri, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
