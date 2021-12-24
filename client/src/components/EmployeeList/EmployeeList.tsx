import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { EmployeeListProps } from '../../types/EmployeeListProps';
import { User } from '../../types/User';
import FilterAndSort from '../FilterAndSort/FilterAndSort';

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

        {employees.length > 0 ? (
          employees.map((employee: User) => (
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
                        {employee.job.department} &#8226;{' '}
                        {employee.location.country}
                      </>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        ) : (
          <div className="h-full m-16 text-sm text-center">
            No results found
            <div className="flex items-center justify-center m-4">
              <img
                src="https://www.svgrepo.com/show/48089/sad.svg"
                alt=":("
                className="w-16 h-16"
              ></img>
            </div>
            <div className="m-2 text-xs text-center">
              Try a different search query, or perhaps a different filter.
            </div>
          </div>
        )}
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
