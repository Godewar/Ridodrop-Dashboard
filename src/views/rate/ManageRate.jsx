import React, { useState } from 'react';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Avatar, Tabs, Tab } from '@mui/material';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ElectricRickshawIcon from '@mui/icons-material/ElectricRickshaw';
import { useNavigate } from 'react-router-dom';

const vehicleTypes = [
  { label: '2W', icon: <DirectionsBikeIcon fontSize="medium" /> },
  { label: '3W', icon: <AirportShuttleIcon fontSize="medium" /> },
  { label: 'Truck', icon: <LocalShippingIcon fontSize="medium" /> },
  { label: 'E-Loader', icon: <ElectricRickshawIcon fontSize="medium" /> },
];

const subTypeOptions = {
  '2W': ['Bike', 'Scooter', 'Electric Bike'],
  '3W': ['Petrol', 'Diesel', 'Electric'],
  'Truck': ['Diesel'],
  'E-Loader': ['E-Loader'],
};

// Truck varieties for Diesel
const truckVarieties = [
  'Tata ACE',
  '8 Feet',
  '9 Feet',
  'TATA 407',
  '14 Feet',
  '17 Feet',
];

const ManageRate = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [subTypeIdx, setSubTypeIdx] = useState(0);
  const [truckVarietyIdx, setTruckVarietyIdx] = useState(0);
  const navigate = useNavigate();
  const selectedType = vehicleTypes[selectedIdx].label;
  const subTypes = subTypeOptions[selectedType];

  // Reset subType index when vehicle type changes
  React.useEffect(() => {
    setSubTypeIdx(0);
    setTruckVarietyIdx(0);
  }, [selectedIdx]);

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', mt: 5 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 3, ml: 2 }}>
        Manage Price
          </Typography>
      <Box sx={{ display: 'flex', flex: 1, width: '100vw', justifyContent: 'center', alignItems: 'flex-start' }}>
        {/* Sidebar inside a single white card */}
        <Box sx={{ minWidth: 200, mr: 2, pt: 2 }}>
          <Box sx={{ bgcolor: 'white', boxShadow: 4, borderRadius: 3, p: 2, minWidth: 180 }}>
            <List sx={{ p: 0 }}>
              {vehicleTypes.map((type, idx) => (
                <Box key={type.label} sx={{ mb: 0.5, display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                  <ListItemButton
                    selected={selectedIdx === idx}
                    onClick={() => setSelectedIdx(idx)}
                    sx={{
                      borderRadius: 1,
                      color: selectedIdx === idx ? 'primary.main' : 'text.primary',
                      bgcolor: selectedIdx === idx ? 'primary.lighter' : 'transparent',
                      fontWeight: selectedIdx === idx ? 700 : 400,
                      boxShadow: selectedIdx === idx ? 2 : 0,
                      transition: 'all 0.2s',
                      minHeight: 40,
                      pl: 1.5,
                      pr: 1.5,
                      alignItems: 'center',
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32, color: selectedIdx === idx ? 'primary.main' : 'grey.500' }}>
                      {type.icon}
                    </ListItemIcon>
                    <ListItemText primary={type.label} primaryTypographyProps={{ fontSize: 15 }} />
                  </ListItemButton>
                  {/* Show sub-type buttons to the right of the selected sidebar item only */}
                  {selectedIdx === idx && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, ml: 2, position: 'relative', zIndex: 1 }}>
                      {subTypeOptions[type.label].map((sub, subIdx) => (
                        <React.Fragment key={sub}>
                        <Box
                          sx={{
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: subIdx === subTypeIdx ? 4 : 1,
                            border: subIdx === subTypeIdx ? '2px solid #1976d2' : '1px solid #eee',
                            transition: 'all 0.2s',
                            minWidth: 90,
                            minHeight: 36,
                            px: 2,
                            py: 1.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontWeight: subIdx === subTypeIdx ? 700 : 400,
                            color: subIdx === subTypeIdx ? 'primary.main' : 'text.primary',
                            fontSize: 15,
                          }}
                            onClick={() => {
                              setSubTypeIdx(subIdx);
                              if (type.label === 'Truck' && sub === 'Diesel') {
                                // Do not navigate yet, wait for variety click
                              } else {
                                navigate(`/price/add/${encodeURIComponent(type.label)}/${encodeURIComponent(sub)}`);
                              }
                            }}
                        >
                          {sub}
                        </Box>
                          {/* If Truck/Diesel is selected, show truck varieties */}
                          {type.label === 'Truck' && sub === 'Diesel' && subIdx === subTypeIdx && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2, mt: 1 }}>
                              {truckVarieties.map((variety, vIdx) => (
                                <Box
                                  key={variety}
                                  sx={{
                                    bgcolor: 'white',
                                    borderRadius: 2,
                                    boxShadow: vIdx === truckVarietyIdx ? 4 : 1,
                                    border: vIdx === truckVarietyIdx ? '2px solid #1976d2' : '1px solid #eee',
                                    transition: 'all 0.2s',
                                    minWidth: 120,
                                    minHeight: 36,
                                    px: 2,
                                    py: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontWeight: vIdx === truckVarietyIdx ? 700 : 400,
                                    color: vIdx === truckVarietyIdx ? 'primary.main' : 'text.primary',
                                    fontSize: 15,
                                  }}
                                  onClick={() => {
                                    setTruckVarietyIdx(vIdx);
                                    navigate(`/price/add/Truck/${encodeURIComponent(variety)}`);
                                  }}
                                >
                                  {variety}
                                </Box>
                              ))}
                            </Box>
                          )}
                        </React.Fragment>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </List>
          </Box>
        </Box>
        {/* Main Content: Show selected vehicle type avatar and info directly on the page */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', pt: 4 }}>
          <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mb: 2, width: 80, height: 80, mx: 'auto' }}>
            {vehicleTypes[selectedIdx].icon}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
            {vehicleTypes[selectedIdx].label}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {subTypes[subTypeIdx]}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.85, mt: 1 }}>
              Price management for {subTypes[subTypeIdx]} will be available here.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageRate; 