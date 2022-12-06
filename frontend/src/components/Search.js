import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, OutlinedInput} from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';


const mycolumns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'location', headerName: 'Location', width: 170 },
  {
    field: 'department',
    headerName: 'Department',
    type: 'text',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
  },
  {
    field: 'email',
    headerName: 'Email',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  }
];


const rows = [
  { id: 1, name: 'Snow', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 2, name: 'Lannister', location:'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 3, name: 'Lannister', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 4, name: 'Stark', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 5, name: 'Targaryen', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 6, name: 'Melisandre', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 7, name: 'Clifford', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 8, name: 'Frances', location:'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
  { id: 9, name: 'Roxie', location: 'Peshawar, Pakistan', department: "Computer Science",phone:"+923159675198", email:"ali@123.com" },
];

export default function Search() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const submitHandler = (e) => {
    e.preventDefault()
   
  }
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    
    <>
     <div style={{ height: 400, width: '100%' }}>
     <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Search </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Name"
          />
        </FormControl>
      <DataGrid
        rows={rows}
        columns={mycolumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

<Box
  display="flex"
  justifyContent="center"
  alignItems="center"

>
<Button variant="outlined" size="large"  onClick={submitHandler} >
          Generate Report
        </Button>
</Box>
    </div>

 


    </>
   
  );
}
