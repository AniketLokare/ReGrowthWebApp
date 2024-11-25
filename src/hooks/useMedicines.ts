import { QueryKey, useMutation, useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { MEDICINES } from 'src/constants/paths';
import axiosClient from 'src/util/axios';
import { getMedicineWithIdRoute, MEDICINES_ROUTE } from 'src/api/medicine/routes';
import { useState } from 'react';

/**
 * API
 */
export const getMedicinesList = (config?: AxiosRequestConfig) =>
  axiosClient
    .get<PaginatedResponse<Medicine>>(MEDICINES, config)
    .then((res) => res.data);

/**
 * HOOKS
 */
export const useGetMedicinesList = <Override = PaginatedResponse<Medicine>>(
  opts?: UseQueryOption<PaginatedResponse<Medicine>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['medicines', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Medicine>>({
    queryKey,
    queryFn: ({ signal }) => getMedicinesList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};

export const createMedicine = (
  payload: CreateMedicinePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Medicine>(MEDICINES_ROUTE, payload, config);

export const getMedicineDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Medicine>(getMedicineWithIdRoute(id), config)
    .then((res) => res.data);

export const patchMedicine = (id: string, payload: CreateMedicinePayload) =>
  axiosClient.patch<Medicine, CreateMedicinePayload>(
    getMedicineWithIdRoute(id),
    payload,
  );

export const deleteMedicine = (id: string) =>
  axiosClient.delete<null>(getMedicineWithIdRoute(id));

/**
 * HOOKS
 */
/* export const useGetMedicineList = <Override = PaginatedResponse<Medicine>>(
  opts?: UseQueryOption<PaginatedResponse<Medicine>, Override>,
) => {
  const { key, useQueryConfig, apiConfig } = opts || {};
  const queryKey = (key || ['medicines', apiConfig.params]) as QueryKey;

  const { data, ...rest } = useQuery<PaginatedResponse<Medicine>>({
    queryKey,
    queryFn: ({ signal }) => getMedicineList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
}; */

export const useCreateMedicine = (
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => createMedicine(payload),
    ...opts,
  });
};

export const useGetMedicineDetail = <Override = Medicine>(
  opts: SingleUseQueryOption<Medicine, Override>,
) => {
  const { apiConfig, id } = opts;
  const queryKey = ['registry', id] as QueryKey;
  return useQuery({
    queryKey,
    queryFn: ({ signal }) => getMedicineDetail(id, { ...apiConfig, signal }),
    enabled: !!id,
  });
};

export const usePatchMedicine = (
  id: string,
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => {
      return patchMedicine(id, payload);
    },
    ...opts,
  });
};

export const useDeleteMedicine = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteMedicine(id),
    ...opts,
  });
};


interface DeleteConfirmationModalValuesm {
  id: string;
  name: string;
}

type UseDeleteProps = {
  onDelete: (id: string) => void;
};

export const useDeleteConfirmationModalm = (props: UseDeleteProps) => {
  const { onDelete } = props;
  const [deleteConfirmationModalValuesm, setDeleteConfirmationModalValuesm] =
    useState<DeleteConfirmationModalValuesm>({ id: '', name: '' });
  const [showDeleteConfirmationModalm, setShowDeleteConfirmationModalm] =
    useState<boolean>(false);

  const onDeleteConfirm = () => {
    onDelete(deleteConfirmationModalValuesm.id);
    setShowDeleteConfirmationModalm(false);
  };

  const onShowDeleteConfirmationModalm = (id: string, name: string) => {
    setDeleteConfirmationModalValuesm({ id, name });
    setShowDeleteConfirmationModalm(true);
  };

  const onClose = () => setShowDeleteConfirmationModalm(false);

  return {
    deleteConfirmationModalValuesm,
    showDeleteConfirmationModalm,
    onDeleteConfirm,
    onShowDeleteConfirmationModalm,
    onClose,
  };
};

export default useDeleteConfirmationModalm;
