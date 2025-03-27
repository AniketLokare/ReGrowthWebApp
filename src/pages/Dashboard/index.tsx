import React from 'react';
import { Card, CardContent, Stack, Typography, Avatar, Grid, Box } from '@mui/material';
import ProcedureCountCard from './Cards/ProcedureCountCard';
import TotalIncomeCard from './Cards/TotalIncomeCard';
import OnlinePaymentCard from './Cards/OnlinePaymentCard';
import CashPaymentCard from './Cards/CashPaymentCard';

import PageViewsBarChart from './Charts/PageViewsBarChart';
import IncomeReportChart from './Charts/IncomeReportChart';
import ExternalHospitalReport from './Charts/ExternalHospitalReport';
import MedicalIncomeCardWrapper from './Cards/MedicalIncomeCard';
import InventoryExpenseCardWrapper from './Cards/InventoryExpenseCard';
import MedicineCountChart from './Charts/MedicineCountChart';
import ReactVirtualizedTable from './ReactVirtualizedTable';
import ClinicIncomeCard from './Cards/ClinicIncomeCard';
import ExternalProcedureIncome from './Cards/ExternalProcedureIncomeCard';

const Dashboard: React.FC = (): JSX.Element => {
  return (
    <Box sx={{ padding: '16px' }}>
      <Grid container spacing={3}>
        {/* Total Income Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <TotalIncomeCard />
        </Grid>

        {/* Online Payment Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <OnlinePaymentCard />
        </Grid>

        {/* Cash Payment Card */}
        <Grid item xs={12} sm={6} md={2.4}>
          <CashPaymentCard />
        </Grid>

        {/* Clinic Income*/}
        <Grid item xs={12} sm={6} md={2.4}>
          <ClinicIncomeCard />
        </Grid>

        {/* External Proceduew income */}
        <Grid item xs={12} sm={6} md={2.4}>
          <ExternalProcedureIncome />
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <PageViewsBarChart />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <IncomeReportChart />
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        {/* Row 1: ExternalHospitalReport and MedicineCountChart */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* External Hospital Report */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <ExternalHospitalReport />
              </Card>
              <Grid container spacing={2}>
                {/* Total Income Card */}
                <Grid item xs={12} sm={6} mt={2}>
                  <MedicalIncomeCardWrapper />
                </Grid>

                {/* Total Orders Card */}
                <Grid item xs={12} sm={6} mt={2}>
                  <InventoryExpenseCardWrapper />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <MedicineCountChart />
          </Card>
        </Grid>

        {/* Row 2: Total Income and Total Orders Cards */}
      </Grid>

      <Grid container spacing={3} mt={2} mb={2}>
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <ReactVirtualizedTable />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;