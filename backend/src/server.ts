import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './endpoints/index';
import { auth0Config } from './config/auth0';
import { auth } from 'express-openid-connect';

dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(auth(auth0Config));

app.use('/', routes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: ${process.env.BACKEND_URL}`);
});