import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Chip,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  Stack,
  Alert,
  Checkbox,
  Switch,
  FormControlLabel,
  Badge,
  LinearProgress,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Today as TodayIcon,
  DateRange as DateRangeIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  DirectionsBike as BikeIcon,
  AirportShuttle as AutoIcon,
  LocalShipping as TruckIcon,
  CalendarToday as CalendarIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  MoreVert as MoreVertIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Dummy order data
const dummyOrders = [
  {
    id: 'ORD001',
    serialNo: 1,
    customerId: 'CUST001',
    customerName: 'Alice Johnson',
    customerMobile: '9876543210',
    customerEmail: 'alice@example.com',
    orderDate: '2024-01-15',
    orderTime: '10:30 AM',
    vehicleType: '2W',
    pickupLocation: 'Mumbai Central, Mumbai',
    dropLocation: 'Andheri West, Mumbai',
    amount: 150,
    status: 'Completed',
    driverName: 'Ravi Kumar',
    driverMobile: '9000000001',
    paymentMethod: 'Wallet',
    orderType: 'Express',
    priority: 'High',
    assignedAt: '2024-01-15 10:35 AM',
    completedAt: '2024-01-15 11:45 AM'
  },
  {
    id: 'ORD002',
    serialNo: 2,
    customerId: 'CUST002',
    customerName: 'Bob Smith',
    customerMobile: '9123456780',
    customerEmail: 'bob@example.com',
    orderDate: '2024-01-16',
    orderTime: '02:15 PM',
    vehicleType: '3W',
    pickupLocation: 'Bandra East, Mumbai',
    dropLocation: 'Juhu, Mumbai',
    amount: 200,
    status: 'In Progress',
    driverName: 'Suresh Singh',
    driverMobile: '9000000002',
    paymentMethod: 'Cash',
    orderType: 'Standard',
    priority: 'Medium',
    assignedAt: '2024-01-16 02:20 PM',
    completedAt: null
  },
  {
    id: 'ORD003',
    serialNo: 3,
    customerId: 'CUST003',
    customerName: 'Charlie Brown',
    customerMobile: '9988776655',
    customerEmail: 'charlie@example.com',
    orderDate: '2024-01-17',
    orderTime: '09:45 AM',
    vehicleType: 'Truck',
    pickupLocation: 'Mumbai Port, Mumbai',
    dropLocation: 'Bhiwandi, Maharashtra',
    amount: 800,
    status: 'Pending',
    driverName: null,
    driverMobile: null,
    paymentMethod: 'Card',
    orderType: 'Heavy',
    priority: 'Low',
    assignedAt: null,
    completedAt: null
  },
  {
    id: 'ORD004',
    serialNo: 4,
    customerId: 'CUST004',
    customerName: 'Priya Singh',
    customerMobile: '9876512345',
    customerEmail: 'priya@example.com',
    orderDate: '2024-01-18',
    orderTime: '11:20 AM',
    vehicleType: '2W',
    pickupLocation: 'Kurla West, Mumbai',
    dropLocation: 'Ghatkopar, Mumbai',
    amount: 120,
    status: 'Canceled',
    driverName: null,
    driverMobile: null,
    paymentMethod: 'Wallet',
    orderType: 'Express',
    priority: 'High',
    assignedAt: null,
    completedAt: null,
    cancellationReason: 'Customer requested cancellation'
  },
  {
    id: 'ORD005',
    serialNo: 5,
    customerId: 'CUST005',
    customerName: 'Rohit Sharma',
    customerMobile: '9123456790',
    customerEmail: 'rohit@example.com',
    orderDate: '2024-01-19',
    orderTime: '03:30 PM',
    vehicleType: '3W',
    pickupLocation: 'Thane West, Maharashtra',
    dropLocation: 'Mulund, Mumbai',
    amount: 250,
    status: 'Completed',
    driverName: 'Rajesh Kumar',
    driverMobile: '9000000004',
    paymentMethod: 'Cash',
    orderType: 'Standard',
    priority: 'Medium',
    assignedAt: '2024-01-19 03:35 PM',
    completedAt: '2024-01-19 04:20 PM'
  }
];

const ManageOrder = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [filteredOrders, setFilteredOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  // Filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Canceled', label: 'Canceled' }
  ];

  const vehicleOptions = [
    { value: 'all', label: 'All Vehicles' },
    { value: '2W', label: '2 Wheeler' },
    { value: '3W', label: '3 Wheeler' },
    { value: 'Truck', label: 'Truck' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ];

  // Vehicle type icons
  const getVehicleIcon = (type) => {
    switch (type) {
      case '2W': return <BikeIcon />;
      case '3W': return <AutoIcon />;
      case 'Truck': return <TruckIcon />;
      default: return <BikeIcon />;
    }
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Completed':
        return { color: 'success', icon: <CheckCircleIcon /> };
      case 'In Progress':
        return { color: 'warning', icon: <PlayIcon /> };
      case 'Pending':
        return { color: 'info', icon: <PendingIcon /> };
      case 'Canceled':
        return { color: 'error', icon: <CancelIcon /> };
      default:
        return { color: 'default', icon: <InfoIcon /> };
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = [...orders];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.driverName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Apply vehicle filter
    if (vehicleFilter !== 'all') {
      filtered = filtered.filter(order => order.vehicleType === vehicleFilter);
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(order => order.priority === priorityFilter);
    }

    // Apply date filter
    if (customStartDate && customEndDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= customStartDate && orderDate <= customEndDate;
      });
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, vehicleFilter, priorityFilter, customStartDate, customEndDate]);

  // Handle order selection
  const handleOrderSelect = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = () => {
    if (bulkAction && selectedOrders.length > 0) {
      setOrders(prev => prev.map(order => 
        selectedOrders.includes(order.id) 
          ? { ...order, status: bulkAction }
          : order
      ));
      setSelectedOrders([]);
      setBulkActionDialogOpen(false);
      setBulkAction('');
    }
  };

  // Handle order detail view
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  // Handle order edit
  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setEditDialogOpen(true);
  };

  // Calculate statistics
  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(order => order.status === 'Pending').length;
  const inProgressOrders = filteredOrders.filter(order => order.status === 'In Progress').length;
  const completedOrders = filteredOrders.filter(order => order.status === 'Completed').length;
  const canceledOrders = filteredOrders.filter(order => order.status === 'Canceled').length;
  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: 'primary.main' }}>
        Manage Orders
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h4">{totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'info.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4">{pendingOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'warning.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">{inProgressOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'success.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Completed
              </Typography>
              <Typography variant="h4">{completedOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'error.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Canceled
              </Typography>
              <Typography variant="h4">{canceledOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card sx={{ bgcolor: 'secondary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Amount
              </Typography>
              <Typography variant="h4">₹{totalAmount.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Vehicle</InputLabel>
              <Select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                label="Vehicle"
              >
                {vehicleOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                label="Priority"
              >
                {priorityOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setVehicleFilter('all');
                setPriorityFilter('all');
                setCustomStartDate(null);
                setCustomEndDate(null);
              }}
              fullWidth
            >
              Clear
            </Button>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DateRangeIcon />}
              onClick={() => setBulkActionDialogOpen(true)}
              disabled={selectedOrders.length === 0}
              fullWidth
            >
              Bulk
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>
                  <Checkbox
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    indeterminate={selectedOrders.length > 0 && selectedOrders.length < filteredOrders.length}
                    onChange={handleSelectAll}
                    sx={{ color: 'white' }}
                  />
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>S. No.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Order ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Customer</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Driver</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Date & Time</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Vehicle</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Amount</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Priority</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order, index) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <TableRow key={order.id} hover>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleOrderSelect(order.id)}
                      />
                    </TableCell>
                    <TableCell>{order.serialNo}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.customerId}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <PhoneIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {order.customerMobile}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {order.driverName ? (
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {order.driverName}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <PhoneIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {order.driverMobile}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">-</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.orderTime}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getVehicleIcon(order.vehicleType)}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {order.vehicleType}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        ₹{order.amount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={statusInfo.icon}
                        label={order.status}
                        color={statusInfo.color}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.priority}
                        color={getPriorityColor(order.priority)}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            color="primary"
                            size="small"
                            onClick={() => handleViewDetails(order)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Order">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={() => handleEditOrder(order)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More Actions">
                          <IconButton
                            color="default"
                            size="small"
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredOrders.length === 0 && (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Alert severity="info">No orders found matching your criteria.</Alert>
          </Box>
        )}
      </Paper>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <SpeedDialIcon />
      </Fab>

      {/* Bulk Action Dialog */}
      <Dialog
        open={bulkActionDialogOpen}
        onClose={() => setBulkActionDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Bulk Action</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected {selectedOrders.length} order(s)
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Action</InputLabel>
            <Select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              label="Action"
            >
              <MenuItem value="Pending">Mark as Pending</MenuItem>
              <MenuItem value="In Progress">Mark as In Progress</MenuItem>
              <MenuItem value="Completed">Mark as Completed</MenuItem>
              <MenuItem value="Canceled">Mark as Canceled</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkActionDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleBulkAction} variant="contained" disabled={!bulkAction}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
            Order Details - {selectedOrder?.id}
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <Grid container spacing={3}>
              {/* Order Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Order Information
                </Typography>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Order ID</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.id}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Order Date</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {new Date(selectedOrder.orderDate).toLocaleDateString()} at {selectedOrder.orderTime}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Order Type</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.orderType}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedOrder.paymentMethod}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Amount</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      ₹{selectedOrder.amount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip
                      label={selectedOrder.status}
                      color={getStatusInfo(selectedOrder.status).color}
                      icon={getStatusInfo(selectedOrder.status).icon}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Priority</Typography>
                    <Chip
                      label={selectedOrder.priority}
                      color={getPriorityColor(selectedOrder.priority)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Stack>
              </Grid>

              {/* Customer Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Customer Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {selectedOrder.customerName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {selectedOrder.customerName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedOrder.customerId}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedOrder.customerMobile}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{selectedOrder.customerEmail}</Typography>
                  </Box>
                </Stack>
              </Grid>

              {/* Location Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Location Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Pickup Location
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ mr: 1, color: 'success.main' }} />
                        <Typography variant="body2">{selectedOrder.pickupLocation}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        Drop Location
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ mr: 1, color: 'error.main' }} />
                        <Typography variant="body2">{selectedOrder.dropLocation}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Driver Information */}
              {selectedOrder.driverName && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                    Driver Information
                  </Typography>
                  <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <PersonIcon />
                        </Avatar>
                      </Grid>
                      <Grid item xs>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedOrder.driverName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <PhoneIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {selectedOrder.driverMobile}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getVehicleIcon(selectedOrder.vehicleType)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {selectedOrder.vehicleType}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}

              {/* Timeline Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
                  Order Timeline
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Order Created</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {new Date(selectedOrder.orderDate).toLocaleDateString()} at {selectedOrder.orderTime}
                      </Typography>
                    </Box>
                  </Box>
                  {selectedOrder.assignedAt && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AssignmentIcon sx={{ mr: 2, color: 'warning.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Assigned to Driver</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedOrder.assignedAt}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  {selectedOrder.completedAt && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon sx={{ mr: 2, color: 'success.main' }} />
                      <Box>
                        <Typography variant="body2" color="text.secondary">Completed</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {selectedOrder.completedAt}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageOrder; 