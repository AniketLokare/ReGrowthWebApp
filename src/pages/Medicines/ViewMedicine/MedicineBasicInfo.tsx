import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {
  ErrorBoundary,
  InfoField,
  PageLoader,
  Table,
  TableError,
} from 'src/components';


interface MedicineBasicInfoProps {
  medicineDetails?: Medicine;
}

const MedicineBasicInfo: React.FC<MedicineBasicInfoProps> = ({
  medicineDetails,
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
            label="Medicine Name"
            value={medicineDetails?.medicineName}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Pack Details"
            value={medicineDetails?.medicinePack}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Type"
            value={medicineDetails?.medicineType}
            flexBasis="50%"
          />
          <InfoField
            label="Medicine Price"
            value={`${medicineDetails?.medicinePrice}`}
            flexBasis="50%"
          />
        </Box>
      </Stack>
      <Box>
        <Typography
          variant="appBlack"
          sx={{ fontSize: '15px', fontWeight: 700 }}
        >
          Medicine Procedures
        </Typography>
        <Box sx={{ marginTop: '13px' }}>
          <ErrorBoundary fallbackComponent={TableError}>
            <PageLoader
              isLoading={false}
              Components={{ Loading: 'table' }}
              isEmpty={true}
              emptyMessage="No Medicine Procedures"
            >
              {/** TODO: Implement patient procedures table */}
              <Table data={[]} columns={[]} enableRowSelection={false} />
            </PageLoader>
          </ErrorBoundary>
        </Box>
      </Box>
    </Stack>
  );
};

export default MedicineBasicInfo;
