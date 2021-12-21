import { User } from "./types/User";

const axios = require('axios');
const faker = require('faker');

const getUsers = async () => {
  const users = await axios.get('https://randomuser.me/api/?results=500');
  return {
    info: users.data.info,
    results: users.data.results.map((user: User) => ({
      ...user,
      job: {
        title: faker.name.jobTitle(),
        department: faker.name.jobArea(),
      },
    })),
  };
};

export default getUsers;
