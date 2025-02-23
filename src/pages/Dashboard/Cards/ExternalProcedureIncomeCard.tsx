import React, { useState, useMemo } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { AURO_METAL } from 'src/constants/colors';
import { useGetFilteredExternalProcedures } from 'src/hooks/useExternalProcedures';
import { useForm} from 'react-hook-form';
import { format } from 'date-fns';

const ExternalProcedureIncome: React.FC = () => {
  const [shouldFetch] = useState(false);
  const [isTrendingUp] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<string>('N/A');

  const methods = useForm({
    defaultValues: {
      fromDate: '',
      toDate: '',
    },
  });

  const getFirstDayOfMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  };

  const getCurrentDate = () => {
    return new Date();
  };

  const formatDate = (date: Date) => {
    return format(date, 'dd-MM-yyyy');
  };

  const { response, isFetching, isError, refetch, isLoading } =
    useGetFilteredExternalProcedures({
      fromDate: formatDate(getFirstDayOfMonth()),
      toDate: formatDate(getCurrentDate()),
    });

  const { finalAmountTotal } = useMemo(() => {
    if (!response || response.length === 0) {
      return { finalAmountTotal: 0 };
    }
    return response.reduce(
      (totals, procedure) => {
        totals.finalAmountTotal += procedure.finalAmount || 0;

        return totals;
      },
      { finalAmountTotal: 0 },
    );
  }, [response]);

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
              bgcolor: AURO_METAL,
              height: { xs: 48, sm: 56 },
              width: { xs: 48, sm: 56 },
            }}
          >
            <PaymentsIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              External Procedure Income
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              {finalAmountTotal}
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

export default ExternalProcedureIncome;
