import {
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useState } from 'react';

const Sort = ({ appliedSorting, setAppliedSorting }: SortProps) => {
  const [sortIsOpen, setSortIsOpen] = useState(false);

  return (
    <div
      className="flex mx-2 cursor-pointer"
      onMouseEnter={() => setSortIsOpen(true)}
      onMouseLeave={() => setSortIsOpen(false)}
    >
      Sort{' '}
      <img
        src="https://www.svgrepo.com/show/25790/down-arrow.svg"
        alt="down arrow"
        className="w-3 h-3 mx-1 mt-2"
      ></img>
      {sortIsOpen && (
        <Paper className="absolute z-50 w-auto h-auto p-4 bg-gray-100 cursor-default whitespace-nowrap top-11">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="sorting"
              name="radio-buttons-group"
              onChange={(e, val) => setAppliedSorting(val)}
              value={appliedSorting}
            >
              <FormControlLabel
                value="nameAsc"
                control={<Radio />}
                label="Name: A-Z"
              />
              <FormControlLabel
                value="nameDesc"
                control={<Radio />}
                label="Name: Z-A"
              />
              <FormControlLabel
                value="jobTitleAsc"
                control={<Radio />}
                label="Job title: A-Z"
              />
              <FormControlLabel
                value="jobTitleDesc"
                control={<Radio />}
                label="Job title: Z-A"
              />
              <FormControlLabel
                value="departmentAsc"
                control={<Radio />}
                label="Department: A-Z"
              />
              <FormControlLabel
                value="departmentDesc"
                control={<Radio />}
                label="Department: Z-A"
              />
            </RadioGroup>
          </FormControl>
        </Paper>
      )}
    </div>
  );
};

export default Sort;
