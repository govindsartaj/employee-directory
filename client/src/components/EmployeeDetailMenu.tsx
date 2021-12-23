import { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {
  Paper,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeDetailMenu = ({
  deleteEmployee,
  id,
}: EmployeeDetailMenuProps) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickDelete = () => {
    if (
      window.confirm(
        'You are about to permanently delete this employee? Proceed?'
      )
    ) {
      deleteEmployee(id);
      navigate('/');
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <button type="button" onClick={handleClick}>
          <img
            alt="employee detail menu button"
            className="absolute right-0"
            src="https://www.svgrepo.com/show/304556/three-dots.svg"
          ></img>
        </button>
        {open ? (
          <Paper className="absolute z-50 w-auto h-auto right-2 top-11">
            <List dense>
              <Link to={`/${id}/edit`}>
                <ListItem disablePadding>
                  <ListItemButton className="flex justify-center">
                    <ListItemText primary="Edit information" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <ListItem disablePadding>
                <ListItemButton
                  className="flex justify-center"
                  onClick={handleClickDelete}
                >
                  <ListItemText primary="Delete employee" />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default EmployeeDetailMenu;
