import { User } from './types/User';

const applyFilters = (users: Array<User>, query: qs.ParsedQs) => {
  let result = users;
  let departmentFilter = query.department;
  const titleFilter = query.jobTitle;
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

  if (titleFilter) {
    if (Array.isArray(titleFilter)) {
      result = result.filter(
        (user) =>
          Array.isArray(titleFilter) &&
          titleFilter.map((v) => String(v)).includes(user.job.title)
      );
    } else {
      result = result.filter((user) => user.job.title === titleFilter);
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
  console.log(query);
};

export { applyFilters, applySorting };
