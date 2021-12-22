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

const EmployeeList = ({
  employees,
  selected,
  setSelected,
}: EmployeeListProps) => {
  const handleClick = (id: number) => {
    console.log(id);
    setSelected(id);
  };

  return (
    <List dense className="w-4/12 2xl:w-3/12">
      <Paper elevation={1} className='p-1 w-full'>
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
      </Paper>
    </List>
  );
};

export default EmployeeList;