import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import moment from 'moment';
import { SUCCESS_GREEN, LIGHT_WARNING_ORANGE } from 'src/constants/colors';
import { useGetProceduresList } from 'src/hooks/useProcedures';

const ClinicIncomeCard: React.FC = () => {
  const [clinicIncome, setClinicIncome] = useState<string>('₹0');
  const [percentage, setPercentage] = useState<string>('0%');
  const [isTrendingUp, setIsTrendingUp] = useState<boolean>(true);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const { response, isLoading, isError } = useGetProceduresList({
    apiConfig: { params: {} },
    useQueryConfig: { staleTime: 5 * 60 * 1000 },
  });

  useEffect(() => {
    if (!response || isLoading || isError) return;

    const procedures = response.content || [];
    let currentMonthTotal = 0;
    let lastMonthTotal = 0;

    procedures.forEach((procedure: any) => {
      // Parse the date correctly using moment
      const procedureDate = moment(
        procedure.procedureDate,
        'DD-MM-YYYY',
      ).toDate();
      const procedureMonth = procedureDate.getMonth();
      const procedureYear = procedureDate.getFullYear();

      const finalAmount = Number(procedure.finalAmount) || 0; // Ensure finalAmount is a valid number

      if (procedureYear === currentYear && procedureMonth === currentMonth) {
        currentMonthTotal += finalAmount;
      } else if (
        procedureYear === lastMonthYear &&
        procedureMonth === lastMonth
      ) {
        lastMonthTotal += finalAmount;
      }
    });

    setClinicIncome(`₹${currentMonthTotal.toLocaleString()}`);

    if (lastMonthTotal > 0) {
      const percentChange =
        ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      setPercentage(
        `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`,
      );
      setIsTrendingUp(percentChange > 0);
    } else {
      setPercentage('N/A');
      setIsTrendingUp(true);
    }
  }, [
    response,
    isLoading,
    isError,
    currentMonth,
    currentYear,
    lastMonth,
    lastMonthYear,
  ]);

  if (isLoading) {
    return (
      <Card sx={{ borderRadius: 3, padding: 2 }}>
        <Typography variant="body2">Loading...</Typography>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card sx={{ borderRadius: 3, padding: 2 }}>
        <Typography color="error" variant="body2">
          Failed to load data.
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, padding: { xs: 1, sm: 2 } }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: SUCCESS_GREEN,
              height: { xs: 48, sm: 56 },
              width: { xs: 48, sm: 56 },
            }}
          >
            <AccountBalanceWalletIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Clinic Procedure
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              {clinicIncome}
            </Typography>
          </Box>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2} mt={2}>
          {isTrendingUp ? (
            <TrendingUpIcon color="success" />
          ) : (
            <TrendingDownIcon color="error" />
          )}
          <Typography
            color={isTrendingUp ? 'success.main' : 'error'}
            variant="body2"
            sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}
          >
            {percentage}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            Since last month
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ClinicIncomeCard;
