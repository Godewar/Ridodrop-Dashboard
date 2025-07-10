import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Chip } from '@mui/material';

const vehicleTypes = [
  { label: '2W', value: '2W' },
  { label: '3W', value: '3W' },
  { label: 'Truck', value: 'Truck' }
];

// Dummy vehicle data (without model field)
const mockApi = {
  vehicles: [
    { id: 1, regNumber: 'DL01AB1234', type: '2W', city: 'Delhi', owner: 'John Doe', status: 'Active' },
    { id: 2, regNumber: 'MH12XY5678', type: 'Truck', city: 'Mumbai', owner: 'Amit Kumar', status: 'Inactive' },
    { id: 3, regNumber: 'KA05CD4321', type: '3W', city: 'Bangalore', owner: 'Jane Smith', status: 'Active' },
    { id: 4, regNumber: 'DL02EF5678', type: '2W', city: 'Delhi', owner: 'Ravi Verma', status: 'Active' },
    { id: 5, regNumber: 'MH14GH9876', type: 'Truck', city: 'Pune', owner: 'Sunil Singh', status: 'Active' },
    { id: 6, regNumber: 'KA07IJ6543', type: '3W', city: 'Bangalore', owner: 'Manoj Yadav', status: 'Inactive' },
  ],
  fetchVehicles: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.vehicles);
      }, 500);
    });
  }
};

const ManageVehicle = () => {
  const [tab, setTab] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockApi.fetchVehicles().then((data) => {
      setVehicles(data);
      setLoading(false);
    });
  }, []);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  // Filter and sort vehicles by selected type and registration number
  const filteredVehicles = vehicles
    .filter((v) => v.type === vehicleTypes[tab].value)
    .sort((a, b) => a.regNumber.localeCompare(b.regNumber));

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', mx: 'auto', mt: 5, px: { xs: 1, sm: 3, md: 5 } }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom sx={{ mb: 4 }}>
            Manage Vehicle
          </Typography>
          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
        {vehicleTypes.map((type) => (
          <Tab key={type.value} label={type.label} />
        ))}
          </Tabs>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress color="primary" />
                    </Box>
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Registration Number</b></TableCell>
                <TableCell><b>Owner</b></TableCell>
                <TableCell><b>City</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">No vehicles found for this type.</TableCell>
                </TableRow>
              ) : (
                filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>{vehicle.regNumber}</TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>{vehicle.city}</TableCell>
                    <TableCell>
                      <Chip label={vehicle.status} color={vehicle.status === 'Active' ? 'success' : 'default'} size="small" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManageVehicle; 