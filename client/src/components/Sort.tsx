import {
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useState } from 'react';

const Sort = () => {
  const [sortIsOpen, setSortIsOpen] = useState(false);

  return (
    <div
      className="flex cursor-pointer"
      onMouseEnter={() => setSortIsOpen(true)}
      onMouseLeave={() => setSortIsOpen(false)}
    >
      Sort{' '}
      <img
        src="https://www.svgrepo.com/show/25790/down-arrow.svg"
        alt="down arrow"
        className="h-3 w-3 mt-2 mx-1"
      ></img>
      {sortIsOpen && (
        <Paper className="absolute top-11 w-36 h-36 z-50 p-4 bg-gray-100 cursor-default">
          <FormControl component="fieldset">
            <RadioGroup aria-label="sorting" name="radio-buttons-group">
              <FormControlLabel
                value="Name: A-Z"
                control={<Radio />}
                label="Name: A-Z"
              />
              <FormControlLabel
                value="Name: Z-A"
                control={<Radio />}
                label="Name: Z-A"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      )}
    </div>
  );
};

export default Sort;
