import { User } from '../types/User';

type Props = {
  employees: Array<User> | undefined;
};

const EmployeeListContainer = ({ employees }: Props) => {
  return <>{JSON.stringify(employees)}</>;
};

export default EmployeeListContainer;
