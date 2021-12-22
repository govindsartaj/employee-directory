import { User } from './User';

type EmployeeListProps = {
  employees: Array<User>;
  selected: number | undefined;
  setSelected: Function;
};
