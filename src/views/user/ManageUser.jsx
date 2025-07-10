import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Tabs, Tab, Grid, TextField, Button, MenuItem, InputLabel, Select, FormControl, Snackbar, Alert, CircularProgress, Autocomplete } from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, PersonAdd } from '@mui/icons-material';

const roles = ['Admin', 'Driver', 'Manager'];
const statusOptions = ['Active', 'Suspended', 'Pending'];

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const initialUser = {
  fullName: '',
  email: '',
  mobile: '',
  role: '',
  status: 'Active',
};

// Mock API
const mockApi = {
  users: [
    { id: 1, fullName: 'John Doe', email: 'john@example.com', mobile: '9876543210', role: 'Admin', status: 'Active' },
    { id: 2, fullName: 'Jane Smith', email: 'jane@example.com', mobile: '9123456780', role: 'Manager', status: 'Pending' },
    { id: 3, fullName: 'Amit Kumar', email: 'amit@example.com', mobile: '9988776655', role: 'Driver', status: 'Suspended' },
  ],
  fetchUsers: function (search = '') {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!search) resolve(this.users);
        else resolve(this.users.filter((u) => u.fullName.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())));
      }, 500);
    });
  },
  addUser: function (user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, id: Date.now() };
        this.users.push(newUser);
        resolve(newUser);
      }, 700);
    });
  },
  updateUser: function (id, user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) return reject('User not found');
        this.users[idx] = { ...this.users[idx], ...user };
        resolve(this.users[idx]);
      }, 700);
    });
  },
  deleteUser: function (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) return reject('User not found');
        this.users.splice(idx, 1);
        resolve();
      }, 700);
    });
  },
};

const ManageUser = () => {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(initialUser);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch users for Update/Delete
  useEffect(() => {
    setLoading(true);
    mockApi.fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, [tab]);

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
    setUser(initialUser);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await mockApi.addUser(user);
      setSnackbar({ open: true, message: 'User added successfully!', severity: 'success' });
      setUser(initialUser);
    } catch {
      setSnackbar({ open: true, message: 'Failed to add user.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    try {
      await mockApi.updateUser(selectedUser.id, user);
      setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
      setUser(initialUser);
      setSelectedUser(null);
    } catch {
      setSnackbar({ open: true, message: 'Failed to update user.', severity: 'error' });
    }
    setLoading(false);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setLoading(true);
    try {
      await mockApi.deleteUser(selectedUser.id);
      setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'info' });
      setSelectedUser(null);
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete user.', severity: 'error' });
    }
    setLoading(false);
  };

  // When selecting a user for update, fill the form
  useEffect(() => {
    if (tab === 1 && selectedUser) {
      setUser({
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        mobile: selectedUser.mobile,
        role: selectedUser.role,
        status: selectedUser.status,
      });
    }
  }, [selectedUser, tab]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5, p: { xs: 1, md: 3 } }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3, p: { xs: 2, md: 4 } }}>
        <CardContent>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Manage Users
          </Typography>
          <Tabs value={tab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
            <Tab label="Add User" />
            <Tab label="Update User" />
            <Tab label="Delete User" />
          </Tabs>

          {/* Add User */}
          <TabPanel value={tab} index={0}>
            <form onSubmit={handleAddUser}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Full Name" name="fullName" value={user.fullName} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" name="email" value={user.email} onChange={handleInputChange} fullWidth required type="email" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Mobile Number" name="mobile" value={user.mobile} onChange={handleInputChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Role</InputLabel>
                    <Select name="role" value={user.role} label="Role" onChange={handleInputChange}>
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>{role}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Status</InputLabel>
                    <Select name="status" value={user.status} label="Status" onChange={handleInputChange}>
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>{status}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth size="large" startIcon={<PersonAdd />} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Add User'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </TabPanel>

          {/* Update User */}
          <TabPanel value={tab} index={1}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => `${option.fullName} (${option.email})`}
              value={selectedUser}
              onChange={(e, newValue) => setSelectedUser(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Search User" fullWidth InputProps={{ ...params.InputProps, startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
              )}
              sx={{ mb: 2 }}
              loading={loading}
            />
            {selectedUser && (
              <form onSubmit={handleUpdateUser}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Full Name" name="fullName" value={user.fullName} onChange={handleInputChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email" name="email" value={user.email} onChange={handleInputChange} fullWidth required type="email" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Mobile Number" name="mobile" value={user.mobile} onChange={handleInputChange} fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Role</InputLabel>
                      <Select name="role" value={user.role} label="Role" onChange={handleInputChange}>
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>{role}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth required>
                      <InputLabel>Status</InputLabel>
                      <Select name="status" value={user.status} label="Status" onChange={handleInputChange}>
                        {statusOptions.map((status) => (
                          <MenuItem key={status} value={status}>{status}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="secondary" fullWidth size="large" disabled={loading}>
                      {loading ? <CircularProgress size={24} /> : 'Update User'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </TabPanel>

          {/* Delete User */}
          <TabPanel value={tab} index={2}>
            <Autocomplete
              options={users}
              getOptionLabel={(option) => `${option.fullName} (${option.email})`}
              value={selectedUser}
              onChange={(e, newValue) => setSelectedUser(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Search User" fullWidth InputProps={{ ...params.InputProps, startAdornment: <SearchIcon sx={{ mr: 1 }} /> }} />
              )}
              sx={{ mb: 2 }}
              loading={loading}
            />
            <form onSubmit={handleDeleteUser}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="error" fullWidth size="large" startIcon={<DeleteIcon />} disabled={!selectedUser || loading}>
                    {loading ? <CircularProgress size={24} /> : 'Delete User'}
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

export default ManageUser; 