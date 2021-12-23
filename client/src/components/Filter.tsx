import {
  Paper,
  FormControl,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  InputLabel,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
const names: Array<string> = ['bob', 'jim', 'john'];

const Filter = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [department, setDepartment] = useState<Array<string>>([]);

  return (
    <div
      className="flex cursor-pointer"
      onMouseEnter={() => setFilterIsOpen(true)}
      onMouseLeave={() => setFilterIsOpen(false)}
    >
      Filter{' '}
      <img
        src="https://www.svgrepo.com/show/25790/down-arrow.svg"
        alt="down arrow"
        className="w-3 h-3 mx-1 mt-2"
      ></img>
      {filterIsOpen && (
        <Paper className="absolute z-50 w-auto h-auto p-4 bg-gray-100 cursor-default whitespace-nowrap top-11">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Department</InputLabel>
            <Select
              multiple
              value={department}
              input={<OutlinedInput label="Department" />}
            >
              <MenuItem>
                <Checkbox checked={false} />
                <ListItemText primary={'boi'} />
              </MenuItem>
            </Select>
          </FormControl>
        </Paper>
      )}
    </div>
  );
};

export default Filter;
