import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaidIcon from '@mui/icons-material/Paid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { gridSpacing } from 'store/constant';

const cardData = [
  {
    title: 'Total Customer',
    value: 1200,
    icon: <PeopleIcon fontSize="large" />, 
    color: '#1976d2',
    bg: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
    tooltip: 'Total registered customers'
  },
  {
    title: 'Total Partner',
    value: 350,
    icon: <GroupAddIcon fontSize="large" />, 
    color: '#388e3c',
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)',
    tooltip: 'Total partners on platform'
  },
  {
    title: 'Waiting for Approval',
    value: 18,
    icon: <HourglassTopIcon fontSize="large" />, 
    color: '#fbc02d',
    bg: 'linear-gradient(135deg, #fffde7 0%, #ffe082 100%)',
    tooltip: 'Partners/customers pending approval'
  },
  {
    title: 'Total Complete Ride',
    value: 980,
    icon: <DirectionsCarIcon fontSize="large" />, 
    color: '#0288d1',
    bg: 'linear-gradient(135deg, #e1f5fe 0%, #81d4fa 100%)',
    tooltip: 'Total rides completed'
  },
  {
    title: 'Today Earning',
    value: '₹5,200',
    icon: <MonetizationOnIcon fontSize="large" />, 
    color: '#43a047',
    bg: 'linear-gradient(135deg, #e8f5e9 0%, #b9f6ca 100%)',
    tooltip: 'Earnings for today'
  },
  {
    title: 'Weekly Earning',
    value: '₹32,000',
    icon: <CalendarViewWeekIcon fontSize="large" />, 
    color: '#6d4c41',
    bg: 'linear-gradient(135deg, #efebe9 0%, #bcaaa4 100%)',
    tooltip: 'Earnings for this week'
  },
  {
    title: 'Monthly Earning',
    value: '₹1,20,000',
    icon: <CalendarMonthIcon fontSize="large" />, 
    color: '#8e24aa',
    bg: 'linear-gradient(135deg, #f3e5f5 0%, #ce93d8 100%)',
    tooltip: 'Earnings for this month'
  },
  {
    title: 'Total Earning',
    value: '₹12,50,000',
    icon: <PaidIcon fontSize="large" />, 
    color: '#d84315',
    bg: 'linear-gradient(135deg, #fbe9e7 0%, #ffab91 100%)',
    tooltip: 'Total earnings on platform'
  },
  {
    title: 'Today Earning',
    value: '₹5,200',
    icon: <TrendingUpIcon fontSize="large" />, 
    color: '#1565c0',
    bg: 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%)',
    tooltip: 'Today earning (repeat card for demo)'
  }
];

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => { setLoading(false); }, []);

  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'primary.main', textAlign: 'center' }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
          Here’s a quick overview of your platform’s key stats and trends.
        </Typography>
      </Grid>
      {cardData.map((card, idx) => (
        <Grid item xs={12} sm={6} md={4} key={card.title + idx} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            sx={{
              background: card.bg,
              color: card.color,
              borderRadius: 4,
              boxShadow: 6,
              p: 2,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.04)',
                boxShadow: 12
              },
              minHeight: 170,
              minWidth: 280,
              maxWidth: 340,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'visible'
            }}
          >
            <Tooltip title={card.tooltip} arrow>
              <Avatar
                sx={{
                  bgcolor: card.color,
                  color: '#fff',
                  width: 64,
                  height: 64,
                  mb: 2,
                  boxShadow: 3,
                  border: '4px solid #fff',
                  position: 'absolute',
                  top: -32,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2
                }}
              >
                {card.icon}
              </Avatar>
            </Tooltip>
            <CardContent sx={{ mt: 4, width: '100%', textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: card.color }}>
                {card.title}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: card.color, mb: 1 }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
