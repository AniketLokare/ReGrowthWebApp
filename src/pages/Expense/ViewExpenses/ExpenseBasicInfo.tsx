import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import {
  InfoField,
} from 'src/components';
import { formatDate } from 'src/util/common';

interface ExpenseBasicInfoProps {
  expenseDetails?: Expense;
}

const ExpenseBasicInfo: React.FC<ExpenseBasicInfoProps> = ({
  expenseDetails,
}): JSX.Element => {
  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="wrap"
          rowGap="20px"
        >
          <InfoField
            label="Type"
            value={expenseDetails?.category}
            flexBasis="50%"
          />
           
          <InfoField
            label="Details"
            value={expenseDetails?.description}
            flexBasis="50%"
          />
          <InfoField
            label="Date"
            value={formatDate(expenseDetails?.date || new Date())}
            flexBasis="50%"
          />
          <InfoField
            label="Total Amount (₹)"
            value={`${expenseDetails?.totalAmount}`}
            flexBasis="50%"
          />
          <InfoField
            label="Online Payment (₹)"
            value={`${expenseDetails?.onlineAmount}`}
            flexBasis="50%"
          />
          <InfoField
            label="Cash Amount (₹)"
            value={`${expenseDetails?.cashAmount}`}
            flexBasis="50%"
          />
           
        </Box>
      </Stack>
    </Stack>
  );
};

export default ExpenseBasicInfo;
