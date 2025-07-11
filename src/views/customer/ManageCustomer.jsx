import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItemButton, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Tabs, Tab, Chip } from '@mui/material';
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
import SearchIcon from '@mui/icons-material/Search';
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
  { id: 1, customerId: 'CUST001', name: 'Alice Johnson', email: 'alice@example.com', mobile: '9876543210', photo: 'https://randomuser.me/api/portraits/women/1.jpg', status: 'Active', pinCode: '110001', memberStatus: 'Active', usingApp: { days: 12, months: 2, years: 1 }, blocked: false },
  { id: 2, customerId: 'CUST002', name: 'Bob Smith', email: 'bob@example.com', mobile: '9123456780', photo: 'https://randomuser.me/api/portraits/men/2.jpg', status: 'Inactive', pinCode: '400001', memberStatus: 'Deactive', usingApp: { days: 5, months: 0, years: 0 }, blocked: true },
  { id: 3, customerId: 'CUST003', name: 'Charlie Brown', email: 'charlie@example.com', mobile: '9988776655', photo: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'Active', pinCode: '560001', memberStatus: 'Active', usingApp: { days: 30, months: 1, years: 0 }, blocked: false },
  { id: 4, customerId: 'CUST004', name: 'Priya Singh', email: 'priya@example.com', mobile: '9876512345', photo: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'Active', pinCode: '122001', memberStatus: 'Active', usingApp: { days: 10, months: 0, years: 2 }, blocked: true },
  { id: 5, customerId: 'CUST005', name: 'Rohit Sharma', email: 'rohit@example.com', mobile: '9123456790', photo: 'https://randomuser.me/api/portraits/men/5.jpg', status: 'Inactive', pinCode: '700001', memberStatus: 'Deactive', usingApp: { days: 0, months: 0, years: 0 }, blocked: false },
  { id: 6, customerId: 'CUST006', name: 'Suresh Kumar', email: 'suresh@example.com', mobile: '9988776611', photo: 'https://randomuser.me/api/portraits/men/6.jpg', status: 'Active', pinCode: '600001', memberStatus: 'Active', usingApp: { days: 25, months: 3, years: 1 }, blocked: true }
];

// Dummy order data for different vehicle types
const orderData = {
  '2W': [
    { customerId: 'CUST001', customerName: 'Alice Johnson', orderId: 'ORD001', vehicleType: '2W', status: 'Completed', amount: 150, date: '2024-01-15', pickup: 'Mumbai Central', drop: 'Andheri West' },
    { customerId: 'CUST002', customerName: 'Bob Smith', orderId: 'ORD002', vehicleType: '2W', status: 'Canceled', amount: 200, date: '2024-01-16', pickup: 'Bandra East', drop: 'Juhu' },
    { customerId: 'CUST003', customerName: 'Charlie Brown', orderId: 'ORD003', vehicleType: '2W', status: 'Completed', amount: 180, date: '2024-01-17', pickup: 'Dadar West', drop: 'Worli' },
    { customerId: 'CUST004', customerName: 'Priya Singh', orderId: 'ORD004', vehicleType: '2W', status: 'Completed', amount: 120, date: '2024-01-18', pickup: 'Kurla West', drop: 'Ghatkopar' }
  ],
  '3W': [
    { customerId: 'CUST005', customerName: 'Rohit Sharma', orderId: 'ORD005', vehicleType: '3W', status: 'Completed', amount: 250, date: '2024-01-15', pickup: 'Thane West', drop: 'Mulund' },
    { customerId: 'CUST006', customerName: 'Suresh Kumar', orderId: 'ORD006', vehicleType: '3W', status: 'Canceled', amount: 300, date: '2024-01-16', pickup: 'Navi Mumbai', drop: 'Panvel' },
    { customerId: 'CUST007', customerName: 'Meera Patel', orderId: 'ORD007', vehicleType: '3W', status: 'Completed', amount: 220, date: '2024-01-17', pickup: 'Vashi', drop: 'Belapur' }
  ],
  'Truck': [
    { customerId: 'CUST008', customerName: 'Amit Kumar', orderId: 'ORD008', vehicleType: 'Truck', status: 'Completed', amount: 800, date: '2024-01-15', pickup: 'Mumbai Port', drop: 'Bhiwandi' },
    { customerId: 'CUST009', customerName: 'Rajesh Singh', orderId: 'ORD009', vehicleType: 'Truck', status: 'Canceled', amount: 1200, date: '2024-01-16', pickup: 'JNPT', drop: 'Pune' },
    { customerId: 'CUST010', customerName: 'Vikram Malhotra', orderId: 'ORD010', vehicleType: 'Truck', status: 'Completed', amount: 950, date: '2024-01-17', pickup: 'Taloja', drop: 'Kalyan' },
    { customerId: 'CUST011', customerName: 'Sanjay Gupta', orderId: 'ORD011', vehicleType: 'Truck', status: 'Completed', amount: 1100, date: '2024-01-18', pickup: 'Dombivli', drop: 'Thane' }
  ]
};

const tabContent = [
  '', // Profile Details will show the table
  '', // Order Details will show vehicle type tabs
  'Cancel details content goes here.',
  'Data analyze content goes here.',
  'Block ID content goes here.',
  'High orders content goes here.',
  'Wallet content goes here.',
  'Refer and earn content goes here.',
  'Download invoice content goes here.'
];

// Add dummy high order data
const highOrderData = [
  {
    customerId: 'CUST010',
    customerName: 'Deepak Mehta',
    orders: [
      {
        orderId: 'ORD1001', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1002', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1003', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1004', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      },
      {
        orderId: 'ORD1005', date: '2024-06-01', receiver: { name: 'Ravi Kumar', number: '9000000001', pincode: '110011', address: '123, MG Road, Delhi' }
      }
    ]
  },
  {
    customerId: 'CUST011',
    customerName: 'Meena Shah',
    orders: [
      {
        orderId: 'ORD2001', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2002', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2003', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2004', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2005', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      },
      {
        orderId: 'ORD2006', date: '2024-06-02', receiver: { name: 'Sunita Sharma', number: '9000000002', pincode: '400012', address: '45, Marine Drive, Mumbai' }
      }
    ]
  }
];

// Add dummy wallet data
const walletData = [
  { customerId: 'CUST001', topUp: 2000, used: 1500, refund: 0 },
  { customerId: 'CUST002', topUp: 1000, used: 800, refund: 100 },
  { customerId: 'CUST003', topUp: 500, used: 500, refund: 0 },
  { customerId: 'CUST004', topUp: 3000, used: 2500, refund: 200 },
  { customerId: 'CUST005', topUp: 0, used: 0, refund: 0 },
  { customerId: 'CUST006', topUp: 1200, used: 1000, refund: 0 }
];

// Add dummy refer and earn data
const referAndEarnData = [
  { customerId: 'CUST001', referrerName: 'N/A', earning: 0 },
  { customerId: 'CUST002', referrerName: 'Alice Johnson', earning: 200 },
  { customerId: 'CUST003', referrerName: 'Bob Smith', earning: 150 },
  { customerId: 'CUST004', referrerName: 'Charlie Brown', earning: 100 },
  { customerId: 'CUST005', referrerName: 'Priya Singh', earning: 0 },
  { customerId: 'CUST006', referrerName: 'Rohit Sharma', earning: 50 }
];

const ManageCustomer = () => {
  const [tab, setTab] = useState(0);
  const [customers, setCustomers] = useState(initialCustomers);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState({});
  const [vehicleTypeTab, setVehicleTypeTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const vehicleTypes = ['2W', '3W', 'Truck'];

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

  const handleVehicleTypeChange = (event, newValue) => {
    setVehicleTypeTab(newValue);
  };

  const getStatusColor = (status) => {
    return status === 'Completed' ? 'success' : 'error';
  };

  // Filtered customers for Profile Details tab
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.mobile.includes(searchTerm)
  );

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
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SearchIcon sx={{ mr: 1, color: 'grey.600' }} />
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search by Name or Mobile Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 320 }}
                />
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>S. No.</b></TableCell>
                      <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Photo</b></TableCell>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Mobile Number</b></TableCell>
                      <TableCell><b>Email ID</b></TableCell>
                      <TableCell><b>Pin Code</b></TableCell>
                      <TableCell><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCustomers.map((customer, idx) => (
                      <TableRow key={customer.id} hover>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>{customer.customerId}</TableCell>
                        <TableCell><Avatar src={customer.photo} alt={customer.name} /></TableCell>
                        <TableCell>
                          <span
                            style={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => navigate(`/customers/${customer.customerId}`)}
                          >
                            {customer.name}
                          </span>
                        </TableCell>
                        <TableCell>{customer.mobile}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.pinCode}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={(e) => { e.stopPropagation(); handleEditOpen(customer); }}><EditIcon /></IconButton>
                          <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleDeleteOpen(customer); }}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 1 ? (
            // Order Details Tab
            <Box>
              <Tabs value={vehicleTypeTab} onChange={handleVehicleTypeChange} sx={{ mb: 3 }}>
                {vehicleTypes.map((type, index) => (
                  <Tab key={type} label={type} />
                ))}
              </Tabs>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Customer ID</b></TableCell>
                      <TableCell><b>Customer Name</b></TableCell>
                      <TableCell><b>Order ID</b></TableCell>
                      <TableCell><b>Vehicle Type</b></TableCell>
                      <TableCell><b>Status</b></TableCell>
                      <TableCell><b>Amount (₹)</b></TableCell>
                      <TableCell><b>Date</b></TableCell>
                      <TableCell><b>Pickup</b></TableCell>
                      <TableCell><b>Drop</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderData[vehicleTypes[vehicleTypeTab]].map((order, index) => (
                      <TableRow key={index}>
                        <TableCell>{order.customerId}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.orderId}</TableCell>
                        <TableCell>{order.vehicleType}</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>₹{order.amount}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.pickup}</TableCell>
                        <TableCell>{order.drop}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : tab === 3 ? (
            // Data Analyze Tab
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Customer ID</b></TableCell>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Using App</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.customerId}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={customer.memberStatus === 'Active' ? 'Active Member' : 'Deactive Member'}
                          color={customer.memberStatus === 'Active' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {customer.usingApp.years > 0 && `${customer.usingApp.years} Year(s) `}
                        {customer.usingApp.months > 0 && `${customer.usingApp.months} Month(s) `}
                        {customer.usingApp.days > 0 && `${customer.usingApp.days} Day(s)`}
                        {customer.usingApp.years === 0 && customer.usingApp.months === 0 && customer.usingApp.days === 0 && '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : tab === 4 ? (
            // Block ID Tab (show all customers with Block/Unblock button)
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Customer ID</b></TableCell>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">No customers found.</TableCell>
                    </TableRow>
                  ) : (
                    customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.customerId}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>
                          <Chip label={customer.blocked ? "Blocked" : "Active"} color={customer.blocked ? "error" : "success"} size="small" />
                        </TableCell>
                        <TableCell>
                          {customer.blocked ? (
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => {
                                setCustomers((prev) => prev.map((c) => c.id === customer.id ? { ...c, blocked: false } : c));
                              }}
                            >
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => {
                                setCustomers((prev) => prev.map((c) => c.id === customer.id ? { ...c, blocked: true } : c));
                              }}
                            >
                              Block
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : tab === 5 ? (
            // High Orders Tab
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Customer Name</b></TableCell>
                    <TableCell><b>Number of Orders (Day)</b></TableCell>
                    <TableCell><b>Order Details</b></TableCell>
                    <TableCell><b>Receiver Details</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {highOrderData.filter(c => c.orders.length >= 5 && c.orders.length <= 10).map((customer, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{customer.customerName}</TableCell>
                      <TableCell>{customer.orders.length}</TableCell>
                      <TableCell>
                        {customer.orders.map((order, i) => (
                          <Box key={order.orderId} sx={{ mb: 1, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                            <div><b>Order ID:</b> {order.orderId}</div>
                            <div><b>Date:</b> {order.date}</div>
                          </Box>
                        ))}
                      </TableCell>
                      <TableCell>
                        {customer.orders.map((order, i) => (
                          <Box key={order.orderId} sx={{ mb: 1, p: 1, border: '1px solid #eee', borderRadius: 1 }}>
                            <div><b>Name:</b> {order.receiver.name}</div>
                            <div><b>Number:</b> {order.receiver.number}</div>
                            <div><b>Pincode:</b> {order.receiver.pincode}</div>
                            <div><b>Address:</b> {order.receiver.address}</div>
                          </Box>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : tab === 6 ? (
            // Wallet Tab
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Customer ID</b></TableCell>
                    <TableCell><b>Top Up (₹)</b></TableCell>
                    <TableCell><b>Used (₹)</b></TableCell>
                    <TableCell><b>Refund (₹)</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {walletData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.customerId}</TableCell>
                      <TableCell>{row.topUp}</TableCell>
                      <TableCell>{row.used}</TableCell>
                      <TableCell>{row.refund > 0 ? row.refund : ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : tab === 7 ? (
            // Refer and Earn Tab
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Customer ID</b></TableCell>
                    <TableCell><b>Referrer Customer Name</b></TableCell>
                    <TableCell><b>Earning (₹)</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referAndEarnData.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.customerId}</TableCell>
                      <TableCell>{row.referrerName}</TableCell>
                      <TableCell>{row.earning}</TableCell>
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