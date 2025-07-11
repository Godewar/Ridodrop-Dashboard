import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Avatar, Button, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Chip, Tooltip, Grid, Card, CardContent, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Dummy data for demonstration
const dummyCustomers = [
  {
    id: 'CUST001',
    name: 'Alice Johnson',
    status: 'Active',
    mobile: '9876543210',
    joiningDate: '2023-01-15',
    bank: {
      accountNumber: '1234567890',
      ifsc: 'SBIN0001234',
      bankName: 'State Bank of India',
      branch: 'Connaught Place',
      holder: 'Alice Johnson'
    },
    balance: 2000,
    address: '123, Main Street, New Delhi, 110001',
    orders: {
      '2W': [
        { orderId: 'ORD001', date: '2024-01-15', amount: 150, status: 'Completed', driver: 'Ravi Kumar', driverMobile: '9000000001' },
        { orderId: 'ORD002', date: '2024-01-16', amount: 200, status: 'Canceled' }
      ],
      '3W': [
        { orderId: 'ORD003', date: '2024-02-01', amount: 300, status: 'Completed', driver: 'Suresh Singh', driverMobile: '9000000002' }
      ],
      'Truck': [
        { orderId: 'ORD004', date: '2024-03-10', amount: 800, status: 'Completed', driver: 'Amit Sharma', driverMobile: '9000000003' }
      ]
    },
    transactions: [
      { id: 'TXN001', date: '2024-04-01', type: 'Top Up', amount: 1000 },
      { id: 'TXN002', date: '2024-04-10', type: 'Order Payment', amount: -150 },
      { id: 'TXN003', date: '2024-05-01', type: 'Refund', amount: 200 }
    ]
  },
  // Add more dummy customers as needed
];

const vehicleTypes = [
  { label: '2W', icon: <DirectionsBikeIcon /> },
  { label: '3W', icon: <AirportShuttleIcon /> },
  { label: 'Truck', icon: <LocalShippingIcon /> }
];

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = dummyCustomers.find((c) => c.id === id) || dummyCustomers[0];
  const [tab, setTab] = useState(0);
  const [refundDialog, setRefundDialog] = useState(false);
  const [refundAmount, setRefundAmount] = useState('');
  const [balance, setBalance] = useState(customer.balance);

  const handleRefund = () => {
    const amt = parseFloat(refundAmount);
    if (!isNaN(amt) && amt > 0 && amt <= balance) {
      setBalance((prev) => prev - amt); // Subtract refund from balance
      setRefundDialog(false);
      setRefundAmount('');
    }
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', p: 0, m: 0 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, mt: 2, ml: 2 }}>
        Back
      </Button>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4, boxShadow: 6, width: { xs: '98vw', md: '90vw' }, mx: 'auto', minHeight: '90vh', bgcolor: 'background.paper', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* Header Section */}
        <Card sx={{ display: 'flex', alignItems: 'center', mb: 4, p: 3, borderRadius: 3, boxShadow: 2, background: 'linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)' }}>
          <Avatar sx={{ width: 80, height: 80, mr: 4, border: '3px solid #fff', boxShadow: 3, fontSize: 36 }}>{customer.name[0]}</Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: 1 }}>{customer.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Tooltip title="Mobile Number"><PhoneIcon color="primary" sx={{ mr: 0.5 }} /></Tooltip>
              <Typography color="text.secondary">{customer.mobile}</Typography>
              <Tooltip title="Status"><Chip label={customer.status} color={customer.status === 'Active' ? 'success' : 'error'} size="small" sx={{ fontWeight: 600 }} /></Tooltip>
              <Tooltip title="Joining Date"><CalendarTodayIcon color="action" sx={{ ml: 2, mr: 0.5 }} /></Tooltip>
              <Typography color="text.secondary">{customer.joiningDate}</Typography>
            </Box>
          </Box>
        </Card>
        {/* Bank Details */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1, p: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Bank Details</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}><Typography><b>Account Holder:</b> {customer.bank.holder}</Typography></Grid>
              <Grid item xs={12} sm={6} md={4}><Typography><b>Account Number:</b> {customer.bank.accountNumber}</Typography></Grid>
              <Grid item xs={12} sm={6} md={4}><Typography><b>IFSC:</b> {customer.bank.ifsc}</Typography></Grid>
              <Grid item xs={12} sm={6} md={4}><Typography><b>Bank Name:</b> {customer.bank.bankName}</Typography></Grid>
              <Grid item xs={12} sm={6} md={4}><Typography><b>Branch:</b> {customer.bank.branch}</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>
        {/* Balance */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1, p: 2, background: 'linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%)' }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AccountBalanceWalletIcon color="secondary" sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Account Balance</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 24, color: 'primary.main' }}>₹{balance}</Typography>
            </Box>
          </CardContent>
        </Card>
        {/* Address */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1, p: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LocationOnIcon color="error" sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Address</Typography>
              <Typography>{customer.address}</Typography>
            </Box>
          </CardContent>
        </Card>
        {/* Order History */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1, p: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>Order History</Typography>
            </Box>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
              {vehicleTypes.map((type, idx) => (
                <Tab key={type.label} label={type.label} icon={type.icon} iconPosition="start" />
              ))}
            </Tabs>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>S. No.</b></TableCell>
                    <TableCell><b>Order ID</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Amount (₹)</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Driver Name</b></TableCell>
                    <TableCell><b>Driver Mobile</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(customer.orders[vehicleTypes[tab].label] || []).map((order, idx) => (
                    <TableRow key={idx} sx={{ background: order.status === 'Completed' ? 'rgba(76, 175, 80, 0.08)' : order.status === 'Canceled' ? 'rgba(244, 67, 54, 0.08)' : 'inherit' }}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Chip label={order.status} color={order.status === 'Completed' ? 'success' : order.status === 'Canceled' ? 'error' : 'default'} size="small" />
                      </TableCell>
                      <TableCell>
                        {order.status === 'Completed' && order.driver ? (
                          <Tooltip title={order.driverMobile}><AccountCircleIcon color="primary" sx={{ mr: 0.5, verticalAlign: 'middle' }} />{order.driver}</Tooltip>
                        ) : '-'}
                      </TableCell>
                      <TableCell>
                        {order.status === 'Completed' && order.driverMobile ? (
                          <Tooltip title="Call Driver"><PhoneIcon color="success" sx={{ mr: 0.5, verticalAlign: 'middle' }} />{order.driverMobile}</Tooltip>
                        ) : '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        {/* Refund Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="warning" startIcon={<ReplayIcon />} sx={{ borderRadius: 2, fontWeight: 600, px: 4, py: 1.5, fontSize: 16, boxShadow: 2 }} onClick={() => setRefundDialog(true)}>
            Refund
          </Button>
        </Box>
        <Dialog open={refundDialog} onClose={() => setRefundDialog(false)}>
          <DialogTitle>Refund Amount</DialogTitle>
          <DialogContent>
            <TextField
              label="Refund Amount"
              type="number"
              value={refundAmount}
              onChange={(e) => setRefundAmount(e.target.value)}
              fullWidth
              margin="normal"
              inputProps={{ min: 1, max: balance }}
            />
            <Typography variant="body2" color="text.secondary">
              Current Balance: ₹{balance}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRefundDialog(false)}>Cancel</Button>
            <Button onClick={handleRefund} variant="contained" color="primary" disabled={!refundAmount || parseFloat(refundAmount) <= 0 || parseFloat(refundAmount) > balance}>
              Refund
            </Button>
          </DialogActions>
        </Dialog>
        {/* Transaction History Section */}
        <Card sx={{ mt: 6, borderRadius: 3, boxShadow: 1, p: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>Transaction History</Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>S. No.</b></TableCell>
                    <TableCell><b>Transaction ID</b></TableCell>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Type</b></TableCell>
                    <TableCell><b>Amount (₹)</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customer.transactions.map((txn, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{txn.id}</TableCell>
                      <TableCell>{txn.date}</TableCell>
                      <TableCell>{txn.type}</TableCell>
                      <TableCell style={{ color: txn.amount < 0 ? '#e53935' : '#43a047', fontWeight: 600 }}>
                        {txn.amount < 0 ? <ArrowDownwardIcon fontSize="small" color="error" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> : <ArrowUpwardIcon fontSize="small" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} />}
                        {txn.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default CustomerDetail; 