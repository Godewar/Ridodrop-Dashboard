import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Tabs, Tab, Grid, TextField, Button, MenuItem, InputLabel, Select, FormControl, Snackbar, Alert, CircularProgress, Autocomplete } from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, AddBusiness } from '@mui/icons-material';

const statusOptions = ['Active', 'Inactive'];

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const initialService = {
  name: '',
  description: '',
  price: '',
  status: 'Active',
};

// Mock API
const mockApi = {
  services: [
    { id: 1, name: 'Oil Change', description: 'Engine oil replacement', price: 500, status: 'Active' },
    { id: 2, name: 'Tire Rotation', description: 'Rotate tires for even wear', price: 300, status: 'Inactive' },
    { id: 3, name: 'Car Wash', description: 'Exterior and interior cleaning', price: 200, status: 'Active' },
  ],
  fetchServices: function (search = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!search) resolve(this.services);
        else resolve(this.services.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())));
      }, 500);
    });
  },
  addService: function (service) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newService = { ...service, id: Date.now() };
        this.services.push(newService);
        resolve(newService);
      }, 700);
    });
  },
  deleteService: function (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.services.findIndex((s) => s.id === id);
        if (idx === -1) return reject('Service not found');
        this.services.splice(idx, 1);
        resolve();
      }, 700);
    });
  },
};

const ManageService = () => {
  const [tab, setTab] = useState(0);
  const [service, setService] = useState(initialService);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch services for Delete
  useEffect(() => {
    setLoading(true);
    mockApi.fetchServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, [tab]);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setService(initialService);
    setSelectedService(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mockApi.addService(service);
      setSnackbar({ open: true, message: 'Service added successfully!', severity: 'success' });
      setService(initialService);
    } catch {
      setSnackbar({ open: true, message: 'Failed to add service.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleDeleteService = async (e) => {
    e.preventDefault();
    if (!selectedService) return;
    setLoading(true);
    try {
      await mockApi.deleteService(selectedService.id);
      setSnackbar({ open: true, message: 'Service deleted successfully!', severity: 'info' });
      setSelectedService(null);
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete service.', severity: 'error' });
    }
    setLoading(false);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3, p: { xs: 2, md: 4 } }}>
        <CardContent>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Manage Services
          </Typography>
          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
            <Tab label="Add Service" />
            <Tab label="Delete Service" />
          </Tabs>

          {/* Add Service */}
          <TabPanel value={tab} index={0}>
            <form onSubmit={handleAddService}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Service Name" name="name" value={service.name} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Description" name="description" value={service.description} onChange={handleInputChange} fullWidth required multiline rows={3} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Price" name="price" value={service.price} onChange={handleInputChange} fullWidth required type="number" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={service.status} label="Status" onChange={handleInputChange}>
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large" startIcon={<AddBusiness />} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Add Service'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </TabPanel>

          {/* Delete Service */}
          <TabPanel value={tab} index={1}>
            <Autocomplete
              options={services}
              getOptionLabel={(option) => option ? `${option.name} (${option.status})` : ''}
              value={selectedService || null}
              onChange={(e, newValue) => setSelectedService(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Search Service" fullWidth InputProps={{ ...params.InputProps, startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
              )}
              sx={{ mb: 2 }}
              loading={loading}
            />
            <form onSubmit={handleDeleteService}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="error" fullWidth size="large" startIcon={<DeleteIcon />} disabled={!selectedService || loading}>
                    {loading ? <CircularProgress size={24} /> : 'Delete Service'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </TabPanel>
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageService; 