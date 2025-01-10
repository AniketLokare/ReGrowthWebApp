import { QueryKey, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
<<<<<<< Updated upstream
import { MEDICINES } from "src/constants/paths";
=======
import { deleteMedicineWithIdRoute, editMedicineWithIdRoute, getMedicineWithIdRoute, MEDICINES_ROUTE, NEW_MEDICINE_ROUTE } from "src/api/medicine/routes";
>>>>>>> Stashed changes
import axiosClient from "src/util/axios";

/**
 * API
 */
export const getMedicinesList = (config?: AxiosRequestConfig) =>
  axiosClient
<<<<<<< Updated upstream
    .get<PaginatedResponse<Medicine>>(MEDICINES, config)
=======
    .get<Medicine[]>(MEDICINES_ROUTE, config)
    .then((res) => ({
      content: res.data,
      total: res.data.length,
      page: 1,
      pageSize: res.data.length,
    }));

export const createMedicine = (
  payload: CreateMedicinePayload,
  config?: AxiosRequestConfig,
) => axiosClient.post<Medicine>(NEW_MEDICINE_ROUTE, payload, config);

export const patchMedicine = (id: string, payload: CreateMedicinePayload) =>
  axiosClient.patch<Medicine, CreateMedicinePayload>(
    editMedicineWithIdRoute(id),
    payload,
  );

export const getMedicineDetail = (id: string, config?: AxiosRequestConfig) =>
  axiosClient
    .get<Medicine>(getMedicineWithIdRoute(id), config)
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    queryFn: ({ signal }) => getMedicinesList({ ...apiConfig, signal }),
    enabled: !!apiConfig,
    ...useQueryConfig,
  });

  return { response: data, ...rest };
};
=======
    queryFn: ({ signal }) => getMedicinesList({ ...defaultConfig, ...apiConfig, signal }),
    enabled: true, // Ensure the query always runs
    ...useQueryConfig,
  });

  console.log('Query result:', data); // Log the data for debugging

  return { response: data, ...rest };
};


export const useCreateMedicine = (
  opts?: MutationConfig<Medicine, CreateMedicinePayload>,
) => {
  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) => createMedicine(payload),
    ...opts,
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

export const useDeleteMedicine = (opts?: MutationConfig<null, string>) => {
  return useMutation({
    mutationFn: (id: string) => deleteMedicine(id),
    ...opts,
  });
};

>>>>>>> Stashed changes
