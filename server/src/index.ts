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

// https://stackoverflow.com/a/47831954/13252400
app.get('/user', async (req: Request, res: Response) => {
  if (
    req.query.pre &&
    users.find((user) => user.id === Number(req.query.pre))
  ) {
    users = [
      users.find((user) => user.id === Number(req.query.pre)),
      ...users.filter((user) => user.id !== Number(req.query.pre)),
    ];
  }
  const pageCount = Math.ceil(users.length / 35);
  let page = Number(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }
  res.json({
    total: users.length,
    page: page,
    pageCount: pageCount,
    users: users.slice(page * 35 - 35, page * 35),
  });
});

app.get('/user/:id', async (req: Request, res: Response) => {
  res.send(users.find((user) => user.id === Number(req.params.id)));
});

// data is fetched when server is started - this is done to mock a db
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  const response = await getUsers();
  users = response.results;
  console.log(users.length);
});
