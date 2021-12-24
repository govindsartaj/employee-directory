const encodeFilters = (filters: AvailableFilters) => {
  let result: Array<string> = [];

  filters?.country.forEach((val) => {
    result.push(`country=${val}`);
  });

  filters?.department.forEach((val) => {
    result.push(`department=${val}`);
  });

  return result.join('&');
};

export default encodeFilters;
