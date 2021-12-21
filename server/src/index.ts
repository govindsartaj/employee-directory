const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
import { Request, Response } from 'express';
import getUsers from './getUsers';
import { User } from './types/User';

const PORT = 8080;

// middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

// users array to mock a collection of users
let users: Array<User>;

app.get('/users', async (req: Request, res: Response) => {
  res.send(users);
});

// data is fetched when server is started - this is done to mock a db
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  const response = await getUsers();
  users = response.results
  console.log(users.length);
});
