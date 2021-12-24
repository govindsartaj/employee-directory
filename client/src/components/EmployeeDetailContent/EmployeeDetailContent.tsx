import { Avatar } from "@mui/material";
import { EmployeeDetailContentProps } from "../../types/EmployeeDetailContentProps";
import EmployeeDetailMenu from "../EmployeeDetailMenu/EmployeeDetailMenu";

const EmployeeDetailContent = ({selectedEmployee, deleteEmployee, id} : EmployeeDetailContentProps) => {
  return (
    <div>
      <EmployeeDetailMenu deleteEmployee={deleteEmployee} id={id} />
      <div className="flex justify-center align-middle">
        <Avatar
          alt={`Avatar for ${selectedEmployee?.name?.first} ${selectedEmployee?.name?.last}`}
          src={selectedEmployee?.picture?.large}
          sx={{ height: '10rem', width: '10rem' }}
        />
      </div>
      <div className="pt-4 text-2xl font-bold text-center">{`${selectedEmployee?.name?.first} ${selectedEmployee?.name?.last}`}</div>
      <div className="p-0 text-xl font-medium text-center">{`${selectedEmployee?.job?.title}`}</div>
      <div className="p-0 text-xl font-light text-center">
        Department:{' '}
        <span className="font-medium">{selectedEmployee?.job?.department}</span>
      </div>
      <div className="flex justify-center m-1 align-middle">
        <img
          src="https://www.svgrepo.com/show/133442/location.svg"
          className="w-6 h-6 mx-1"
          alt="location icon"
        />
        {`${selectedEmployee?.location?.city}, ${selectedEmployee?.location?.country}`}
      </div>
      <div className="flex justify-center m-1 align-middle">
        <img
          src="https://www.svgrepo.com/show/14478/email.svg"
          className="w-6 h-6 mx-1"
          alt="email icon"
        />
        <a className="underline" href={`mailto:${selectedEmployee?.email}`}>
          {selectedEmployee?.email}
        </a>
      </div>
      <div className="flex justify-center m-1 align-middle">
        <img
          src="https://www.svgrepo.com/show/46197/phone.svg"
          className="w-6 h-6 mx-1"
          alt="phone icon"
        />
        <a className="underline" href={`tel:${selectedEmployee?.phone}`}>
          {selectedEmployee?.phone}
        </a>
      </div>
    </div>
  );
};

export default EmployeeDetailContent