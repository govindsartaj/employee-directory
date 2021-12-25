import { User } from '../types/User';
import { applySorting, applyFilters, applySearch } from '../sortFilterSearch';

const fakeEmployeesData: Array<User> = [
  {
    id: 1,
    name: { first: 'Jim', last: 'John' },
    job: { title: 'Software Developer', department: 'Sales' },
    location: { city: 'Leeds', country: 'England' },
    email: 'jimjohn@example.com',
    phone: '823847328',
    picture: {
      thumbnail: 'somepicture.png',
      medium: 'somepicture.png',
      large: 'somepicture.png',
    },
  },
  {
    id: 2,
    name: { first: 'Firsty', last: 'Lasty' },
    job: { title: 'Product Manager', department: 'Tech' },
    location: { city: 'London', country: 'England' },
    email: 'firstylasty@example.com',
    phone: '82235668',
    picture: {
      thumbnail: 'somepicture.png',
      medium: 'somepicture.png',
      large: 'somepicture.png',
    },
  },
  {
    id: 3,
    name: { first: 'Zach', last: 'Lastname' },
    job: { title: 'Senior Manager', department: 'Marketing' },
    location: { city: 'Madrid', country: 'Spain' },
    email: 'zach@example.com',
    phone: '86577668',
    picture: {
      thumbnail: 'somepicture.png',
      medium: 'somepicture.png',
      large: 'somepicture.png',
    },
  },
];

describe('sorting tests', () => {
  it('sort by name a-z', () => {
    const result = applySorting(fakeEmployeesData, { sort: 'nameAsc' });
    expect(result[0].id).toEqual(2);
    expect(result[1].id).toEqual(1);
    expect(result[2].id).toEqual(3);
  });

  it('sort by name z-a', () => {
    const result = applySorting(fakeEmployeesData, { sort: 'nameDesc' });
    expect(result[0].id).toEqual(3);
    expect(result[1].id).toEqual(1);
    expect(result[2].id).toEqual(2);
  });

  it('sort by job title a-z', () => {
    const result = applySorting(fakeEmployeesData, { sort: 'jobTitleAsc' });
    expect(result[0].id).toEqual(2);
    expect(result[1].id).toEqual(3);
    expect(result[2].id).toEqual(1);
  });

  it('sort by job title z-a', () => {
    const result = applySorting(fakeEmployeesData, { sort: 'jobTitleDesc' });
    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(3);
    expect(result[2].id).toEqual(2);
  });

  it('sort by job department a-z', () => {
    const result = applySorting(fakeEmployeesData, { sort: 'departmentAsc' });
    expect(result[0].id).toEqual(3);
    expect(result[1].id).toEqual(1);
    expect(result[2].id).toEqual(2);
  });

  it('sort by job department z-a', () => {
    const result = applySorting(fakeEmployeesData, { sort: 'departmentDesc' });
    expect(result[1].id).toEqual(1);
    expect(result[2].id).toEqual(3);
  });
});

describe('filtering tests', () => {
  it('filter by single department', () => {
    const result = applyFilters(fakeEmployeesData, { department: 'Sales' });
    expect(result.length).toEqual(1);
    expect(result.sort()).toEqual([fakeEmployeesData[0]].sort());
  });

  it('filter by multiple departments', () => {
    const result = applyFilters(fakeEmployeesData, {
      department: ['Sales', 'Tech'],
    });
    expect(result.length).toEqual(2);
    expect(result.sort()).toEqual(
      [fakeEmployeesData[0], fakeEmployeesData[1]].sort()
    );
  });

  it('filter by single country', () => {
    const result = applyFilters(fakeEmployeesData, { country: 'England' });
    expect(result.length).toEqual(2);
    expect(result.sort()).toEqual(
      [fakeEmployeesData[0], fakeEmployeesData[1]].sort()
    );
  });

  it('filter by multiple countries', () => {
    const result = applyFilters(fakeEmployeesData, {
      country: ['England', 'Spain'],
    });
    expect(result.length).toEqual(3);
    expect(result.sort()).toEqual(
      [fakeEmployeesData[0], fakeEmployeesData[1], fakeEmployeesData[2]].sort()
    );
  });

  it('filter by both country and department', () => {
    const result = applyFilters(fakeEmployeesData, {
      country: 'England',
      department: 'Sales',
    });
    expect(result.length).toEqual(1);
    expect(result.sort()).toEqual([fakeEmployeesData[0]].sort());
  });
});

describe('searching tests', () => {
  it('empty search query yields all results', () => {
    const result = applySearch(fakeEmployeesData, { search: '' });
    expect(result.sort()).toEqual(fakeEmployeesData.sort());
  });

  it('valid search query yields valid results', () => {
    const result = applySearch(fakeEmployeesData, { search: 'jim' });
    expect(result.sort()).toEqual([fakeEmployeesData[0]].sort());
  });

  it('invalid search query yields no results', () => {
    const result = applySearch(fakeEmployeesData, { search: 'jackson' });
    expect(result).toHaveLength(0);
  });

});
