import QueryString from 'qs';
import { User } from './types/User';

const applyFilters = (users: Array<User>, query: qs.ParsedQs) => {
  let result = users;
  let departmentFilter = query.department;
  const countryFilter = query.country;
  // single value for a filter
  if (departmentFilter) {
    if (Array.isArray(departmentFilter)) {
      result = result.filter(
        (user) =>
          Array.isArray(departmentFilter) &&
          departmentFilter.map((v) => String(v)).includes(user.job.department)
      );
    } else {
      result = result.filter(
        (user) => user.job.department === departmentFilter
      );
    }
  }

  if (countryFilter) {
    if (Array.isArray(countryFilter)) {
      result = result.filter(
        (user) =>
          Array.isArray(countryFilter) &&
          countryFilter.map((v) => String(v)).includes(user.location.country)
      );
    } else {
      result = result.filter((user) => user.location.country === countryFilter);
    }
  }

  return result;
};

const applySorting = (users: Array<User>, query: qs.ParsedQs) => {
  let result = users;

  const sortType = query.sort;
  if (!sortType) return result;

  if (sortType === 'nameAsc') {
    result.sort((a, b) =>
      `${a.name.first} ${a.name.last}` > `${b.name.first} ${b.name.last}`
        ? 1
        : -1
    );
  } else if (sortType === 'nameDesc') {
    result.sort((a, b) =>
      `${a.name.first} ${a.name.last}` > `${b.name.first} ${b.name.last}`
        ? -1
        : 1
    );
  } else if (sortType === 'jobTitleAsc') {
    result.sort((a, b) =>
      `${a.job.title} ${a.job.title}` > `${b.job.title} ${b.job.title}` ? 1 : -1
    );
  } else if (sortType === 'jobTitleDesc') {
    result.sort((a, b) =>
      `${a.job.title} ${a.job.title}` > `${b.job.title} ${b.job.title}` ? -1 : 1
    );
  } else if (sortType === 'departmentAsc') {
    result.sort((a, b) =>
      `${a.job.department} ${a.job.department}` >
      `${b.job.department} ${b.job.department}`
        ? 1
        : -1
    );
  } else if (sortType === 'departmentDesc') {
    result.sort((a, b) =>
      `${a.job.department} ${a.job.department}` >
      `${b.job.department} ${b.job.department}`
        ? -1
        : 1
    );
  }
  return result;
};

const applySearch = (users: Array<User>, query: qs.ParsedQs) => {
  const rawQuery = query.search;
  let result = users;
  if (!rawQuery) return result;
  const searchQuery = rawQuery.toString().toLowerCase();

  return result.filter(({ name, email, phone, location, job }) => {
    let first = name.first.toLowerCase();
    let last = name.last.toLowerCase();
    let city = location.city.toLowerCase();
    let country = location.country.toLowerCase();
    let jobTitle = job.title.toLowerCase();
    let department = job.department.toLowerCase();
    let emailAddress = email.toLowerCase();

    return (
      first.includes(searchQuery) ||
      last.includes(searchQuery) ||
      email.includes(searchQuery) ||
      phone.includes(searchQuery) ||
      city.includes(searchQuery) ||
      country.includes(searchQuery) ||
      jobTitle.includes(searchQuery) ||
      department.includes(searchQuery)
    );
  });
};

export { applyFilters, applySorting, applySearch };
