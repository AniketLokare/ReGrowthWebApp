import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import {
    EXPENSES_ROUTE,
    NEW_EXPENSE_ROUTE,
    getExpenseWithExpenseIdRoute,
    editExpenseWithExpenseIdRoute,
    deleteExpenseWithExpenseIdRoute,
    GET_FILTERED_EXPENSES_ROUTE,
    GET_FILTERED_EXPENSES_BY_CATEGORY_ROUTE,
  
} from 'src/api/expense/routes';
import axiosClient from "src/util/axios";

/**
 * Hook to fetch the list of expenses
 */
export const getExpensesList = (config?: AxiosRequestConfig) =>
    axiosClient
      .get<Expense[]>(EXPENSES_ROUTE, config)
      .then((res) => ({
        content: res.data,
        total: res.data.length,
        page: 1,
        pageSize: res.data.length,
      }));
  
  export const getFilteredExpenses = (
    fromDate: string,
    toDate: string,
    config?: AxiosRequestConfig,
  ) =>
    axiosClient
      .get<Expense[]>(GET_FILTERED_EXPENSES_ROUTE, {
        ...config,
        params: { fromDate, toDate },
      })
      .then((res) => res.data);
  
  export const createExpense = (
    payload: CreateExpensePayload,
    config?: AxiosRequestConfig,
  ) => axiosClient.post<Expense>(NEW_EXPENSE_ROUTE, payload, config);
  
  export const patchExpense = (id: string, payload: CreateExpensePayload) =>
    axiosClient.patch<Expense, CreateExpensePayload>(
      editExpenseWithExpenseIdRoute(id),
      payload,
    );
  
  export const getExpenseDetail = (id: string, config?: AxiosRequestConfig) =>
    axiosClient
      .get<Expense>(getExpenseWithExpenseIdRoute(id), config)
      .then((res) => res.data);
  
  export const deleteExpense = (id: string) =>
    axiosClient.delete<null>(deleteExpenseWithExpenseIdRoute(id));
  /**
   * HOOKS
   */
  export const useGetExpenseList = <Override = PaginatedResponse<Expense>>(
    opts?: UseQueryOption<PaginatedResponse<Expense>, Override>,
  ) => {
    const { key, useQueryConfig, apiConfig } = opts || {};
    const queryKey = (key || ['expense', apiConfig.params]) as QueryKey;
  
    const { data, ...rest } = useQuery<PaginatedResponse<Expense>>({
      queryKey,
      queryFn: ({ signal }) => getExpensesList({ ...apiConfig, signal }),
      enabled: !!apiConfig,
      ...useQueryConfig,
    });
  
    return { response: data, ...rest };
  };
  
  export const useCreateExpense = (
    opts?: MutationConfig<Expense, CreateExpensePayload>,
  ) => {
    return useMutation({
      mutationFn: (payload: CreateExpensePayload) => createExpense(payload),
      ...opts,
    });
  };
  
  export const usePatchExpense = (
    id: string,
    opts?: MutationConfig<Expense, CreateExpensePayload>,
  ) => {
    return useMutation({
      mutationFn: (payload: CreateExpensePayload) => {
        return patchExpense(id, payload);
      },
      ...opts,
    });
  };
  
  export const useGetExpenseDetail = <Override = Expense>(
    opts: SingleUseQueryOption<Expense, Override>,
  ) => {
    const { apiConfig, id } = opts;
    const queryKey = ['expense', id] as QueryKey;
    const { data, ...rest } = useQuery({
      queryKey,
      queryFn: ({ signal }) => getExpenseDetail(id, { ...apiConfig, signal }),
      enabled: !!id,
    });
  
    return { response: data, ...rest };
  };
  
  export const useDeleteExpense = (opts?: MutationConfig<null, string>) => {
    return useMutation({
      mutationFn: (id: string) => deleteExpense(id),
      ...opts,
    });
  };
  
  export const useGetFilteredExpenses = <Override = Expense[]>(opts: UseQueryOption<Expense[], Override> & {
    fromDate: string;
    toDate: string;
  
  }) => {
    const { key, useQueryConfig, apiConfig, fromDate, toDate } = opts;
    const queryKey = (key || ['filtered-expenses', fromDate, toDate]) as QueryKey;
  
    const { data, ...rest } = useQuery<Expense[]>({
      queryKey,
      queryFn: ({ signal }) =>
        getFilteredExpenses(fromDate, toDate, { ...apiConfig, signal }),
      enabled: !!fromDate && !!toDate,  // Ensures query is only enabled if all filters are set
      ...useQueryConfig,
    });
  
    return { response: data, ...rest };
  };
  
