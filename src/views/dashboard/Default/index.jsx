import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => { setLoading(false); }, []);

  return (
    <Grid container spacing={gridSpacing}>
      {/* Welcome Banner */}
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
          Here’s a quick overview of your platform’s key stats and trends.
        </Typography>
      </Grid>
      {/* Top Row: Stat Cards */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            {/* You can add another card here if needed */}
          </Grid>
        </Grid>
      </Grid>
      {/* Second Row: Chart and Popular Card */}
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
