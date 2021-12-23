import { User } from './User';

type EmployeeListProps = {
  employees: Array<User>;
  selected: number | undefined;
  setSelected: Function;
  currentPage: number;
  setCurrentPage: Function;
  totalPages: number;
  totalResults: number;
  availableFilters: AvailableFilters;
  appliedFilters: AvailableFilters;
  setAppliedFilters: Function;
  appliedSorting: string;
  setAppliedSorting: Function;
};
