const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
import { Request, Response } from 'express';
import getUsers from './getUsers';

const PORT = 8080;

// middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.get('/users', async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
