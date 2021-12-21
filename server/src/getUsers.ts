import { User } from './types/User';

const axios = require('axios');
const faker = require('faker');

// fetch users from randomuser.me and clean up data to only include fields
//   that might be relevant to an employee database, as well as add fake employment
//      related info using fakerJS
const getUsers = async () => {
  const users = await axios.get('https://randomuser.me/api/?results=500');
  return {
    info: users.data.info,
    results: users.data.results.map(
      ({
        name,
        location,
        email,
        dob,
        phone,
        cell,
        id,
        picture,
        nat,
      }: User) => ({
        name,
        location,
        email,
        dob,
        phone,
        cell,
        id,
        picture,
        nat,
        job: {
          title: faker.name.jobTitle(),
          department: faker.name.jobArea(),
        },
      })
    ),
  };
};

export default getUsers;
