import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import  {TextField} from '@mui/material';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



export default function MaxWidthDialog() {
  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  

  const [currency, setCurrency] = React.useState('EUR');

  const [program, setProgram] = React.useState('BS');
  const [openFilePopup, setOpenFilePopup] = React.useState(false);

  

  
  const [open, setOpen] = React.useState(false);


  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickFOpen = () => {
    setOpenFilePopup(true);
  };
  const handleClickFClose = () => {
    setOpenFilePopup(false);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const [selectedFile, setSelectedFile] = React.useState();
	const [isSelected, setIsSelected] = React.useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};






  return (
    <React.Fragment>
    <div className="sales-analytics">
    <h2>Added New Alumni</h2>
    <div onClick={handleClickOpen} className="item add-product">
      <div>
        <span><AddIcon/></span>
        <h3>Add Single Alumni</h3>
      </div>
    </div>
    <div onClick={handleClickFOpen} className="item add-product">
      <div>
        <span><AddIcon/></span>
        <h3>Upload CSV File</h3>
      </div>
    </div>
  </div>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
        <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                       Add Alumni
                    </Typography>
                    <Button
                        onClick={()=>{setOpen(false)}}>
                        <Close />
                    </Button>
                </div>
        </DialogTitle>
        <DialogContent>
          
          
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
      
      
     
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Name"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Email"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="Department"
          value={currency}
          onChange={handleChange}
          fullWidth sx={{ m: 1 }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Phone</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Phone"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Location</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Location"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Company</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Company"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Position</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Position"
          />
        </FormControl>


      </div>

      <div>
      <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">CGPA</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="CGPA"
          />
        </FormControl>
        <FormControl  sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Batch</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Batch"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }}>
  <InputLabel id="demo-simple-select-label" >Program</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={program}
    label="Program"
    onChange={(e)=>setProgram(e.target.value)}
  >
    <MenuItem value={10}>BS</MenuItem>
    <MenuItem value={20}>PHD</MenuItem>
    <MenuItem value={30}>MS</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ m: 1 }}>
  <InputLabel id="demo-simple-select-label" >isEmployed</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={program}
    label="isEmployed"
    onChange={(e)=>setProgram(e.target.value)}
  >
    <MenuItem value={10}>BS</MenuItem>
    <MenuItem value={20}>PHD</MenuItem>
    <MenuItem value={30}>MS</MenuItem>
  </Select>
</FormControl>
<FormControl sx={{ m: 1 }}>
  <InputLabel id="demo-simple-select-label" >isStudent</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={program}
    label="Program"
    onChange={(e)=>setProgram(e.target.value)}
  >
    <MenuItem value={10}>BS</MenuItem>
    <MenuItem value={20}>PHD</MenuItem>
    <MenuItem value={30}>MS</MenuItem>
  </Select>
</FormControl>
        
       
   
       
      </div>
    </Box>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
        
      </Dialog>



      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={openFilePopup}
        onClose={handleClose}
      >
        <DialogTitle>
        <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                       Add Alumni
                    </Typography>
                    <Button
                        onClick={()=>{setOpenFilePopup(false)}}>
                        <Close />
                    </Button>
                </div>
        </DialogTitle>
        <DialogContent>
          
          
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
 
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to Upload</p>
			)}
			
		</div>
     
    </Box>
        
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmission}>Submit</Button>
        </DialogActions>
        
      </Dialog>

    </React.Fragment>
  );
}