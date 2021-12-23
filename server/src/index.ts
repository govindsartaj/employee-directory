const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
import { Request, Response } from 'express';
import getUsers from './getUsers';
import { User } from './types/User';
import { applyFilters, applySorting } from './sortAndFilter';

const PORT = 8000;

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

// dummy method to generate new unique ID
// would use some hashing func in real life
const generateNewId = () => {
  const idList = users.map((user) => user.id);
  return Math.max(...idList) + 1;
};

// https://stackoverflow.com/a/47831954/13252400
app.get('/user', async (req: Request, res: Response) => {
  let usersResponse = users;
  if (
    req.query.pre &&
    users.find((user) => user.id === Number(req.query.pre))
  ) {
    usersResponse = [
      users.find((user) => user.id === Number(req.query.pre)),
      ...users.filter((user) => user.id !== Number(req.query.pre)),
    ];
  } else {
    usersResponse = applyFilters(usersResponse, req.query);
    usersResponse = applySorting(usersResponse, req.query);
  }

  // pagination
  const pageCount = Math.ceil(usersResponse.length / 35);
  let page = Number(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  res.json({
    filterValues: {
      department: [
        ...new Set(usersResponse.map((item) => item.job.department)),
      ],
      country: [...new Set(usersResponse.map((item) => item.location.country))],
    },
    total: usersResponse.length,
    page: page,
    pageCount: pageCount,
    users: usersResponse.slice(page * 35 - 35, page * 35),
  });
});

app.get('/user/:id', (req: Request, res: Response) => {
  try {
    res.send(users.find((user) => user.id === Number(req.params.id)));
  } catch (e) {
    console.error(e);
  }
});

app.delete('/user/:id', (req: Request, res: Response) => {
  try {
    users = users.filter((user) => user.id !== Number(req.params.id));
    res.json({ success: `deleted user ${req.params.id}` });
  } catch (e) {
    console.error(e);
  }
});

app.put('/user/:id', (req: Request, res: Response) => {
  try {
    let userToUpdate = users.find((user) => user.id === Number(req.params.id));
    if (req.body.first) userToUpdate.name.first = req.body.first;
    if (req.body.last) userToUpdate.name.last = req.body.last;
    if (req.body.jobTitle) userToUpdate.job.title = req.body.jobTitle;
    if (req.body.department) userToUpdate.job.department = req.body.department;
    if (req.body.city) userToUpdate.location.city = req.body.city;
    if (req.body.country) userToUpdate.location.country = req.body.country;
    if (req.body.email) userToUpdate.email = req.body.email;
    if (req.body.phone) userToUpdate.phone = req.body.phone;

    res.send(userToUpdate);
  } catch (e) {
    console.error(e);
  }
});

app.post('/user', (req: Request, res: Response) => {
  try {
    const newUser: User = {
      name: { first: req.body.first, last: req.body.last },
      location: { city: req.body.city, country: req.body.country },
      email: req.body.email,
      phone: req.body.phone,
      id: generateNewId(),
      job: { title: req.body.jobTitle, department: req.body.department },
      picture: {
        thumbnail:
          'https://govindb.com/_next/image?url=%2Fstatic%2Fimages%2Favatar.gif&w=384&q=75',
        medium:
          'https://govindb.com/_next/image?url=%2Fstatic%2Fimages%2Favatar.gif&w=384&q=75',
        large:
          'https://govindb.com/_next/image?url=%2Fstatic%2Fimages%2Favatar.gif&w=384&q=75',
      },
    };
    users.push(newUser);
    res.send(newUser);
  } catch (e) {
    console.error(e);
  }
});

// data is fetched when server is started - this is done to mock a db
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  const response = await getUsers();
  users = response.results;
  console.log(users.length);
});
