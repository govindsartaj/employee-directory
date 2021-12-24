import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddEmployeeButton from '../AddEmployeeButton/AddEmployeeButton';
import SearchBar from '../SearchBar/SearchBar';

const HeaderBar = ({ searchQuery, setSearchQuery }: HeaderBarProps) => {
  return (
    <div className="flex justify-between h-8">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AddEmployeeButton />
    </div>
  );
};

export default HeaderBar;
