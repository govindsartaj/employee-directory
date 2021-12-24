import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AddEmployeeButton = () => {
  return (
    <div className="mx-2">
      <Button variant="outlined">
        <Link to={'/new'}>New employee</Link>
      </Button>
    </div>
  );
};

export default AddEmployeeButton;
