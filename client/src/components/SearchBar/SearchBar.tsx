import { TextField } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <TextField
      hiddenLabel
      placeholder="Search"
      size="small"
      className="w-4/12 2xl:w-3/12"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
