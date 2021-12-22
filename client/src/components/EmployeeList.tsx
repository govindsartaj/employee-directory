import { EmployeeListProps } from '../types/EmployeeListProps';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { User } from '../types/User';
import { useState } from 'react';

const EmployeeList = ({ employees }: EmployeeListProps) => {
  const [checked, setChecked] = useState<number | null>();

  const handleToggle = (id: number) => () => {
    console.log(id);
  };

  return (
    <List
      dense
      className="w-3/5"
    >
      {employees.map((employee: User) => (
        <ListItem
          key={employee.id}
          secondaryAction={
            // <Checkbox
            //   edge="end"
            //   onChange={handleToggle(employee.id)}
            //   checked={false}
            //   inputProps={undefined}
            // />
            undefined
          }
          disablePadding
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar for ${employee.name.first} ${employee.name.last}`}
                src={employee.picture.thumbnail}
              />
            </ListItemAvatar>
            <ListItemText
              primary={`${employee.name.first} ${employee.name.last}`}
              secondary={<>{employee.job.title}<br />{employee.job.department}</>}
              
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default EmployeeList;
