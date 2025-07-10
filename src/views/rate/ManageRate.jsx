import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Tabs, Tab, Grid, TextField, Button, MenuItem, InputLabel, Select, FormControl, Snackbar, Alert, CircularProgress, Autocomplete } from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, AttachMoney } from '@mui/icons-material';

const vehicleTypes = ['2W', '3W', 'Truck'];
const cityOptions = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const initialRate = {
  type: '',
  rate: '',
  city: '',
};

// Mock API
const mockApi = {
  rates: [
    { id: 1, type: '2W', rate: 10, city: 'Delhi' },
    { id: 2, type: '3W', rate: 15, city: 'Mumbai' },
    { id: 3, type: 'Truck', rate: 25, city: 'Bangalore' },
  ],
  fetchRates: function (search = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!search) resolve(this.rates);
        else resolve(this.rates.filter((r) => r.type.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase())));
      }, 500);
    });
  },
  addRate: function (rate) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRate = { ...rate, id: Date.now() };
        this.rates.push(newRate);
        resolve(newRate);
      }, 700);
    });
  },
  updateRate: function (id, rate) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.rates.findIndex((r) => r.id === id);
        if (idx === -1) return reject('Rate not found');
        this.rates[idx] = { ...this.rates[idx], ...rate };
        resolve(this.rates[idx]);
      }, 700);
    });
  },
  deleteRate: function (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.rates.findIndex((r) => r.id === id);
        if (idx === -1) return reject('Rate not found');
        this.rates.splice(idx, 1);
        resolve();
      }, 700);
    });
  },
};

const ManageRate = () => {
  const [tab, setTab] = useState(0);
  const [rate, setRate] = useState(initialRate);
  const [rates, setRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch rates for Update/Delete
  useEffect(() => {
    setLoading(true);
    mockApi.fetchRates().then((data) => {
      setRates(data);
      setLoading(false);
    });
  }, [tab]);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setRate(initialRate);
    setSelectedRate(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRate((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mockApi.addRate(rate);
      setSnackbar({ open: true, message: 'Rate added successfully!', severity: 'success' });
      setRate(initialRate);
    } catch {
      setSnackbar({ open: true, message: 'Failed to add rate.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleUpdateRate = async (e) => {
    e.preventDefault();
    if (!selectedRate) return;
    setLoading(true);
    try {
      await mockApi.updateRate(selectedRate.id, rate);
      setSnackbar({ open: true, message: 'Rate updated successfully!', severity: 'success' });
      setRate(initialRate);
      setSelectedRate(null);
    } catch {
      setSnackbar({ open: true, message: 'Failed to update rate.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleDeleteRate = async (e) => {
    e.preventDefault();
    if (!selectedRate) return;
    setLoading(true);
    try {
      await mockApi.deleteRate(selectedRate.id);
      setSnackbar({ open: true, message: 'Rate deleted successfully!', severity: 'info' });
      setSelectedRate(null);
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete rate.', severity: 'error' });
    }
    setLoading(false);
  };

  // When selecting a rate for update, fill the form
  useEffect(() => {
    if (tab === 1 && selectedRate) {
      setRate({
        type: selectedRate.type,
        rate: selectedRate.rate,
        city: selectedRate.city,
      });
    }
  }, [selectedRate, tab]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3, p: { xs: 2, md: 4 } }}>
        <CardContent>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Manage Rate
          </Typography>
          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
            <Tab label="Add Rate" />
            <Tab label="Update Rate" />
            <Tab label="Delete Rate" />
          </Tabs>

          {/* Add Rate */}
          <TabPanel value={tab} index={0}>
            <form onSubmit={handleAddRate}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required>
                    <InputLabel>Type of Vehicle</InputLabel>
                    <Select name="type" value={rate.type} label="Type of Vehicle" onChange={handleInputChange}>
                      {vehicleTypes.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField label="Rate per km" name="rate" value={rate.rate} onChange={handleInputChange} fullWidth required type="number" InputProps={{ startAdornment: <AttachMoney /> }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth required>
                    <InputLabel>City</InputLabel>
                    <Select name="city" value={rate.city} label="City" onChange={handleInputChange}>
                      {cityOptions.map((city) => (
                        <MenuItem key={city} value={city}>{city}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Add Rate'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </TabPanel>

          {/* Update Rate */}
          <TabPanel value={tab} index={1}>
            <Autocomplete
              options={rates}
              getOptionLabel={(option) => `${option.type} - ${option.city}`}
              value={selectedRate}
              onChange={(e, newValue) => setSelectedRate(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Search Rate" fullWidth InputProps={{ ...params.InputProps, startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
              )}
              sx={{ mb: 2 }}
              loading={loading}
            />
            {selectedRate && (
              <form onSubmit={handleUpdateRate}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                      <InputLabel>Type of Vehicle</InputLabel>
                      <Select name="type" value={rate.type} label="Type of Vehicle" onChange={handleInputChange}>
                        {vehicleTypes.map((type) => (
                          <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField label="Rate per km" name="rate" value={rate.rate} onChange={handleInputChange} fullWidth required type="number" InputProps={{ startAdornment: <AttachMoney /> }} />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth required>
                      <InputLabel>City</InputLabel>
                      <Select name="city" value={rate.city} label="City" onChange={handleInputChange}>
                        {cityOptions.map((city) => (
                          <MenuItem key={city} value={city}>{city}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="secondary" fullWidth size="large" disabled={loading}>
                      {loading ? <CircularProgress size={24} /> : 'Update Rate'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </TabPanel>

          {/* Delete Rate */}
          <TabPanel value={tab} index={2}>
            <Autocomplete
              options={rates}
              getOptionLabel={(option) => `${option.type} - ${option.city}`}
              value={selectedRate}
              onChange={(e, newValue) => setSelectedRate(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Search Rate" fullWidth InputProps={{ ...params.InputProps, startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
              )}
              sx={{ mb: 2 }}
              loading={loading}
            />
            <form onSubmit={handleDeleteRate}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="error" fullWidth size="large" startIcon={<DeleteIcon />} disabled={!selectedRate || loading}>
                    {loading ? <CircularProgress size={24} /> : 'Delete Rate'}
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

export default ManageRate; 