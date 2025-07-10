import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import BarChartIcon from '@mui/icons-material/BarChart';
import BlockIcon from '@mui/icons-material/Block';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const tabLabels = [
  'Profile Details',
  'Order Details',
  'Cancel Details',
  'Data Analyze',
  'Block ID',
  'High Orders',
  'Wallet',
  'Refer And Earn',
  'Download Invoice'
];

const tabIcons = [
  <AccountCircleIcon fontSize="medium" />, // Profile Details
  <ShoppingCartIcon fontSize="medium" />,  // Order Details
  <CancelIcon fontSize="medium" />,        // Cancel Details
  <BarChartIcon fontSize="medium" />,      // Data Analyze
  <BlockIcon fontSize="medium" />,         // Block ID
  <TrendingUpIcon fontSize="medium" />,    // High Orders
  <AccountBalanceWalletIcon fontSize="medium" />, // Wallet
  <GroupAddIcon fontSize="medium" />,      // Refer And Earn
  <DescriptionIcon fontSize="medium" />    // Download Invoice
];

const initialCustomers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', mobile: '9876543210', photo: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'Active', pinCode: '110001' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', mobile: '9123456780', photo: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'Inactive', pinCode: '400001' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', mobile: '9988776655', photo: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'Active', pinCode: '560001' },
  { id: 4, name: 'Priya Singh', email: 'priya@example.com', mobile: '9876512345', photo: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'Active', pinCode: '122001' },
  { id: 5, name: 'Rohit Sharma', email: 'rohit@example.com', mobile: '9123456790', photo: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'Inactive', pinCode: '700001' },
  { id: 6, name: 'Suresh Kumar', email: 'suresh@example.com', mobile: '9988776611', photo: 'https://randomuser.me/api/portraits/men/6.jpg', status: 'Active', pinCode: '600001' }
];

const tabContent = [
  '', // Profile Details will show the table
  'Order details content goes here.',
  'Cancel details content goes here.',
  'Data analyze content goes here.',
  'Block ID content goes here.',
  'High orders content goes here.',
  'Wallet content goes here.',
  'Refer and earn content goes here.',
  'Download invoice content goes here.'
];

const ManageCustomer = () => {
  const [tab, setTab] = useState(0);
  const [customers, setCustomers] = useState(initialCustomers);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState({});
  const navigate = useNavigate();

  // Edit handlers
  const handleEditOpen = (customer) => {
    setEditCustomer(customer);
    setSelectedCustomer(customer);
    setEditDialogOpen(true);
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prev) => ({ ...prev, [name]: value }));
  };
  const handleEditSave = () => {
    setCustomers((prev) => prev.map((c) => (c.id === editCustomer.id ? { ...editCustomer } : c)));
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };
  const handleEditClose = () => {
    setEditDialogOpen(false);
    setSelectedCustomer(null);
  };

  // Delete handlers
  const handleDeleteOpen = (customer) => {
    setSelectedCustomer(customer);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
    setDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };
  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 500, mt: 5 }}>
      <h1>Customer Management</h1>
      <Box sx={{ mb: 2 }}>
        <ArrowBackIcon onClick={() => navigate(-1)} color="primary" sx={{ cursor: 'pointer', fontSize: 28 }} />
      </Box>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Paper sx={{ minWidth: 200, borderRadius: 3, boxShadow: 3, mr: 2, p: 1, bgcolor: 'background.paper', height: 'fit-content' }}>
          <List sx={{ p: 0 }}>
            {tabLabels.map((label, idx) => (
              <ListItemButton
                key={label}
                selected={tab === idx}
                onClick={() => setTab(idx)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: tab === idx ? 'primary.main' : 'text.primary',
                  bgcolor: tab === idx ? 'primary.lighter' : 'transparent',
                  fontWeight: tab === idx ? 700 : 400,
                  boxShadow: tab === idx ? 2 : 0,
                  transition: 'all 0.2s',
                  minHeight: 36,
                  pl: 1.5,
                  pr: 1.5
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: tab === idx ? 'primary.main' : 'grey.500' }}>
                  {tabIcons[idx]}
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ fontSize: 14 }} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
        <Paper sx={{ flex: 1, borderRadius: 3, boxShadow: 3, p: 4, minHeight: 500, bgcolor: 'background.paper' }}>
          <Typography variant="h5" color="primary" gutterBottom>
            {tabLabels[tab]}
          </Typography>
          {tab === 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Photo</b></TableCell>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Mobile Number</b></TableCell>
                    <TableCell><b>Email ID</b></TableCell>
                    <TableCell><b>Pin Code</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell><Avatar src={customer.photo} alt={customer.name} /></TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.mobile}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.pinCode}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditOpen(customer)}><EditIcon /></IconButton>
                        <IconButton color="error" onClick={() => handleDeleteOpen(customer)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">{tabContent[tab]}</Typography>
          )}
        </Paper>
      </Box>
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="xs" fullWidth>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent dividers>
          <TextField label="Name" name="name" value={editCustomer.name || ''} onChange={handleEditChange} fullWidth margin="normal" />
          <TextField label="Mobile Number" name="mobile" value={editCustomer.mobile || ''} onChange={handleEditChange} fullWidth margin="normal" />
          <TextField label="Email ID" name="email" value={editCustomer.email || ''} onChange={handleEditChange} fullWidth margin="normal" />
          <TextField label="Pin Code" name="pinCode" value={editCustomer.pinCode || ''} onChange={handleEditChange} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose} maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <Typography>Are you sure you want to delete this customer?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCustomer; 