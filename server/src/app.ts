import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import urlRoutes from './routes';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(urlRoutes);
console.log({
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  db: process.env.MONGO_DB,
});
const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vztwr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(uri, 'uri');
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
