import { EmployeeListProps } from '../types/EmployeeListProps';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { User } from '../types/User';
import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import FilterAndSort from './FilterAndSort';

const EmployeeList = ({
  employees,
  selected,
  setSelected,
  currentPage,
  setCurrentPage,
  totalPages,
  totalResults,
  availableFilters,
  appliedFilters,
  setAppliedFilters,
  appliedSorting,
  setAppliedSorting,
}: EmployeeListProps) => {
  const handleClick = (id: number) => {
    console.log(id);
    setSelected(id);
  };

  const handlePageChange = (e: any, page: number) => {
    setSelected(undefined);
    setCurrentPage(page);
  };

  return (
    <List dense className="w-4/12 2xl:w-3/12">
      <Paper elevation={1} className="w-full p-1">
        <div className="flex justify-between m-2">
          {totalResults} Results
          <FilterAndSort
            availableFilters={availableFilters}
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            appliedSorting={appliedSorting}
            setAppliedSorting={setAppliedSorting}
          />
        </div>
        {employees.map((employee: User) => (
          <Link key={employee.id} to={`${employee.id}`}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleClick(employee.id)}
                selected={employee.id === selected}
                disableRipple={true}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar for ${employee.name.first} ${employee.name.last}`}
                    src={employee.picture.thumbnail}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${employee.name.first} ${employee.name.last}`}
                  secondary={
                    <>
                      {employee.job.title}
                      <br />
                      {employee.job.department}
                    </>
                  }
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <div className="flex justify-center align-middle">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </Paper>
    </List>
  );
};

export default EmployeeList;
