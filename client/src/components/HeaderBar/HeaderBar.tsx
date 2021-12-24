import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const HeaderBar = ({ searchQuery, setSearchQuery }: HeaderBarProps) => {
  return (
    <div className="flex justify-between h-8">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="mx-2">
        <Button variant="outlined">
          <Link to={'/new'}>New employee</Link>
        </Button>
      </div>
    </div>
  );
};

export default HeaderBar;
