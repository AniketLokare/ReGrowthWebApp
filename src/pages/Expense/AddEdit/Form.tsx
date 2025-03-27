import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { FormInput } from 'src/components';
import { Controller, useFormContext } from 'react-hook-form';
import { format } from 'date-fns/format';
import { getAuthInfo } from 'src/util/auth';
import { expenseCategoryProps } from '../constants';


const ExpenseForm: React.FC = (): JSX.Element => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateExpensePayload>();

  

  const totalAmount = watch('totalAmount');
    
    const cashAmount = parseFloat(String(watch('cashAmount'))) || 0;
    const onlineAmount = parseFloat(String(watch('onlineAmount'))) || 0;
    
  
  useEffect(() => {
    const totalAmount = cashAmount + onlineAmount;
    setValue('totalAmount', isNaN(totalAmount) ? 0 : totalAmount); // Set totalAmount, default to 0 if NaN
  }, [cashAmount, onlineAmount, setValue]); // Update when cashPayment or onlinePayment changes
  
  
  
    
  

  return (
    <Stack spacing={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormInput
                  name="category"
                  label="category"
                  type="select"
                  menuItems={expenseCategoryProps}
                  control={control}
                  placeholder="Select expense type"
                  error={errors.category?.message}
                  trim
                />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="date"
            name="date"
            inputProps={{ min: format(new Date(), 'yyyy-MM-dd') }}
            control={control}
            label="Expense Date"
            error={errors.date?.message}
          />
        </Grid>
        
        
        
        

         <Grid item xs={12} sm={6}>
            <FormInput
              name="onlineAmount"
              label="Enter Online Amount"
              control={control}
              placeholder="Enter online payment"
              error={errors.onlineAmount?.message}        
              />
         </Grid>
        
         <Grid item xs={12} sm={6}>
              <FormInput
                name="cashAmount"
                label="Enter Cash Payment"
                control={control}
                placeholder="Enter cash amount"
                error={errors.cashAmount?.message}                    
                />
          </Grid>
        <Grid item xs={12} sm={6}>
          <FormInput
            type="number"
            name="totalAmount"
            control={control}
            label="Total Amount (₹)"
            error={errors.totalAmount?.message}
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormInput
            name="description"
            label="Expense Details"
            control={control}
            placeholder="Enter Expense  details"
            error={errors.description?.message}
            multiline
            rows={4}
          />
        </Grid>

      </Grid>
    </Stack>
  );
};

export default ExpenseForm;