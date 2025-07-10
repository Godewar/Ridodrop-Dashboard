import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Rating, Link, TextField, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const driverTypes = [
  { label: '2W', value: '2W' },
  { label: '3W', value: '3W' },
  { label: 'Truck', value: 'Truck' }
];

const initialDriver = {
  fullName: '',
  altMobile: '',
  email: '',
  address: '',
  status: 'Pending',
  vehicleType: driverTypes[0].value,
  online: false,
  licenseNumber: '',
  aadharNumber: '',
  panNumber: '',
  rating: 0,
  documents: { aadhar: '', pan: '', license: '' },
  order: { id: '', item: '', status: '' },
  location: { pickup: '', drop: '' }
};

// Dummy data with rich fields
const mockApi = {
  drivers: [
    {
      id: 1,
      fullName: 'John Doe',
      altMobile: '9876543210',
      email: 'john.doe@example.com',
      address: '123 Main St, City A',
      status: 'Approved',
      vehicleType: '2W',
      online: true,
      licenseNumber: 'DL-123456',
      aadharNumber: '1234-5678-9012',
      panNumber: 'ABCDE1234F',
      rating: 4.5,
      documents: {
        aadhar: 'aadhar_john.pdf',
        pan: 'pan_john.pdf',
        license: 'license_john.pdf'
      },
      order: { id: 'ORD123', item: 'Parcel', status: 'In Transit' },
      location: { pickup: 'Sector 10, City A', drop: 'Sector 22, City B' }
    },
    {
      id: 2,
      fullName: 'Jane Smith',
      altMobile: '9123456780',
      email: 'jane.smith@example.com',
      address: '456 Market Rd, City B',
      status: 'Pending',
      vehicleType: '3W',
      online: false,
      licenseNumber: 'DL-654321',
      aadharNumber: '2345-6789-0123',
      panNumber: 'XYZAB9876K',
      rating: 3.8,
      documents: {
        aadhar: 'aadhar_jane.pdf',
        pan: 'pan_jane.pdf',
        license: 'license_jane.pdf'
      },
      order: { id: 'ORD124', item: 'Groceries', status: 'Delivered' },
      location: { pickup: 'Market Road, City C', drop: 'Mall Road, City D' }
    },
    {
      id: 3,
      fullName: 'Amit Kumar',
      altMobile: '9988776655',
      email: 'amit.kumar@example.com',
      address: '789 Warehouse Ln, City C',
      status: 'Suspended',
      vehicleType: 'Truck',
      online: false,
      licenseNumber: 'DL-789012',
      aadharNumber: '3456-7890-1234',
      panNumber: 'LMNOP5432Q',
      rating: 4.0,
      documents: {
        aadhar: 'aadhar_amit.pdf',
        pan: 'pan_amit.pdf',
        license: 'license_amit.pdf'
      },
      order: { id: 'ORD125', item: 'Furniture', status: 'Pending' },
      location: { pickup: 'Warehouse 1', drop: 'Shop 5, City E' }
    }
  ],
  fetchDrivers: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.drivers);
      }, 500);
    });
  }
};

const ManageDriver = () => {
  const [tab, setTab] = useState(0);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [formDriver, setFormDriver] = useState(initialDriver);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setLoading(true);
    mockApi.fetchDrivers().then((data) => {
      setDrivers(data);
      setLoading(false);
    });
  }, []);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  // Filter and sort drivers by selected type and online status
  const filteredDrivers = drivers
    .filter((d) => d.vehicleType === driverTypes[tab].value)
    .sort((a, b) => (b.online === true) - (a.online === true));

  // Handler for assign button
  const handleAssign = (driver) => {
    alert(`Assign order to ${driver.fullName}`);
  };

  // Handler for opening driver details dialog
  const handleOpenDialog = (driver) => {
    setSelectedDriver(driver);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDriver(null);
  };

  // Add/Edit form handlers
  const handleOpenForm = (mode, driver = initialDriver) => {
    setFormMode(mode);
    setFormDriver(driver);
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
    setFormDriver(initialDriver);
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDriver((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'add') {
      const newDriver = { ...formDriver, id: Date.now() };
      setDrivers((prev) => [...prev, newDriver]);
      setSnackbar({ open: true, message: 'Driver added successfully!', severity: 'success' });
    } else if (formMode === 'edit') {
      setDrivers((prev) => prev.map((d) => (d.id === formDriver.id ? formDriver : d)));
      setSnackbar({ open: true, message: 'Driver updated successfully!', severity: 'success' });
    }
    handleCloseForm();
  };

  // Delete handlers
  const handleDelete = (id) => {
    setDeleteId(id);
  };
  const confirmDelete = () => {
    setDrivers((prev) => prev.filter((d) => d.id !== deleteId));
      setSnackbar({ open: true, message: 'Driver deleted successfully!', severity: 'info' });
    setDeleteId(null);
  };
  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', mt: 5, px: { xs: 1, sm: 3, md: 5 } }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ mb: 4 }}>
            Manage Driver
          </Typography>
          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        {driverTypes.map((type) => (
          <Tab key={type.value} label={type.label} />
        ))}
          </Tabs>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => handleOpenForm('add')}>
          Add Driver
                  </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Alternate Mobile</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Online</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDrivers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">No drivers found for this type.</TableCell>
                </TableRow>
              ) : (
                filteredDrivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell>
                      <Button variant="text" color="primary" onClick={() => handleOpenDialog(driver)} sx={{ textTransform: 'none', fontWeight: 600 }}>
                        {driver.fullName}
                  </Button>
                    </TableCell>
                    <TableCell>{driver.altMobile}</TableCell>
                    <TableCell>{driver.status}</TableCell>
                    <TableCell>
                      {driver.online ? (
                        <Chip label="Online" color="success" size="small" />
                      ) : (
                        <Chip label="Offline" color="default" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button size="small" color="primary" onClick={() => handleOpenForm('edit', driver)}><EditIcon /></Button>
                      <Button size="small" color="error" onClick={() => handleDelete(driver.id)}><DeleteIcon /></Button>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleAssign(driver)} sx={{ ml: 1 }}>
                        Assign
                  </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Driver Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Driver Details
          <IconButton onClick={handleCloseDialog} size="small"><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
            {selectedDriver && (
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>{selectedDriver.fullName}</Typography>
              <Typography><b>Mobile:</b> {selectedDriver.altMobile}</Typography>
              <Typography><b>Email:</b> {selectedDriver.email}</Typography>
              <Typography><b>Address:</b> {selectedDriver.address}</Typography>
              <Typography><b>Status:</b> {selectedDriver.status}</Typography>
              <Typography><b>Vehicle Type:</b> {selectedDriver.vehicleType}</Typography>
              <Typography><b>Online:</b> {selectedDriver.online ? 'Yes' : 'No'}</Typography>
              <Typography><b>License Number:</b> {selectedDriver.licenseNumber}</Typography>
              <Typography><b>Aadhar Number:</b> {selectedDriver.aadharNumber}</Typography>
              <Typography><b>PAN Number:</b> {selectedDriver.panNumber}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography><b>Rating:</b></Typography>
                <Rating value={selectedDriver.rating} precision={0.1} readOnly sx={{ ml: 1 }} />
                <Typography sx={{ ml: 1 }}>({selectedDriver.rating})</Typography>
              </Box>
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="subtitle1" color="secondary">Order Details</Typography>
                <Typography><b>Order ID:</b> {selectedDriver.order.id}</Typography>
                <Typography><b>Item:</b> {selectedDriver.order.item}</Typography>
                <Typography><b>Order Status:</b> {selectedDriver.order.status}</Typography>
              </Box>
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="subtitle1" color="secondary">Location Details</Typography>
                <Typography><b>Pick up point:</b> {selectedDriver.location.pickup}</Typography>
                <Typography><b>Drop point:</b> {selectedDriver.location.drop}</Typography>
              </Box>
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="subtitle1" color="secondary">Documents</Typography>
                <Typography><b>Aadhar:</b> <Link href="#" underline="hover">{selectedDriver.documents.aadhar}</Link></Typography>
                <Typography><b>PAN:</b> <Link href="#" underline="hover">{selectedDriver.documents.pan}</Link></Typography>
                <Typography><b>License:</b> <Link href="#" underline="hover">{selectedDriver.documents.license}</Link></Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      {/* Add/Edit Driver Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>{formMode === 'add' ? 'Add Driver' : 'Edit Driver'}</DialogTitle>
        <DialogContent dividers>
          <form id="driver-form" onSubmit={handleFormSubmit}>
            <TextField label="Full Name" name="fullName" value={formDriver.fullName} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Alternate Mobile" name="altMobile" value={formDriver.altMobile} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Email" name="email" value={formDriver.email} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Address" name="address" value={formDriver.address} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Status" name="status" value={formDriver.status} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Vehicle Type" name="vehicleType" value={formDriver.vehicleType} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Online (true/false)" name="online" value={formDriver.online} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="License Number" name="licenseNumber" value={formDriver.licenseNumber} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Aadhar Number" name="aadharNumber" value={formDriver.aadharNumber} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="PAN Number" name="panNumber" value={formDriver.panNumber} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Rating" name="rating" value={formDriver.rating} onChange={handleFormChange} fullWidth margin="normal" required />
            {/* For simplicity, not handling nested fields in the form here */}
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button type="submit" form="driver-form" variant="contained" color="primary">{formMode === 'add' ? 'Add' : 'Update'}</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onClose={cancelDelete} maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete this driver?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for feedback */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageDriver; 