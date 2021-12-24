import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Select, { MultiValue } from 'react-select';

const Filter = ({
  availableFilters,
  appliedFilters,
  setAppliedFilters,
}: FilterProps) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [department, setDepartment] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [filterCount, setFilterCount] = useState(0);

  const handleDepartmentChange = (
    newVal: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setDepartment(newVal.map((a) => a.value));
    setAppliedFilters((prevState: AvailableFilters) => ({
      country: prevState?.country || [],
      department: newVal.map((a) => a.value),
    }));
    setFilterCount(newVal.length + country.length);
  };

  const handleCountryChange = (
    newVal: MultiValue<{
      value: string;
      label: string;
    }>
  ) => {
    setCountry(newVal.map((a) => a.value));
    setAppliedFilters((prevState: AvailableFilters) => ({
      department: prevState?.department || [],
      country: newVal.map((a) => a.value),
    }));
    setFilterCount(newVal.length + department.length);
  };

  return (
    <div
      className="flex cursor-pointer"
      onMouseEnter={() => setFilterIsOpen(true)}
      onMouseLeave={() => setFilterIsOpen(false)}
    >
      Filters ({filterCount})
      <img
        src="https://www.svgrepo.com/show/25790/down-arrow.svg"
        alt="down arrow"
        className="w-3 h-3 mx-1 mt-2"
      ></img>
      {filterIsOpen && (
        <Paper className="absolute z-50 w-64 h-auto p-4 bg-gray-100 cursor-default whitespace-nowrap top-11">
          <Select
            options={availableFilters?.department.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            placeholder="Department"
            isMulti={true}
            onChange={handleDepartmentChange}
            value={department.map((a) => ({ value: a, label: a }))}
            className="m-1"
          />
          <Select
            options={availableFilters?.country.map((opt) => ({
              value: opt,
              label: opt,
            }))}
            placeholder="Country"
            isMulti={true}
            onChange={handleCountryChange}
            value={country.map((a) => ({ value: a, label: a }))}
            className="m-1"
          />
        </Paper>
      )}
    </div>
  );
};

export default Filter;
