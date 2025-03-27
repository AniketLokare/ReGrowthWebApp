type BreadcrumbLink = {
  href: string;
  label: string;
};

type LabelValueProps = {
  label: string | JSX.Element;
  value: string;
};

declare type UseQueryOption<Response, Override = Response> = {
  key?: QueryKey;
  useQueryConfig?: QueryConfig<Response, Override>;
  apiConfig?: AxiosRequestConfig;
};

declare type PaginatedResponse<T> = {
  content: T[];
  first: number;
  last: number;
  items: number;
  next: number;
  prev: number;
};

declare interface SelectBoxType {
  menuItemLabel: React.ReactNode;
  menuItemValue: string | number;
  menuItemId: string | number;
  disabled?: boolean;
}

type MutationConfig<
  Response,
  Payload = unknown,
  Error = ErrorMessage[] | ErrorMessage,
> = Omit<
  UseMutationOptions<Response, AxiosError<Error>, Payload>,
  'mutationFn'
>;

type SingleUseQueryOption<Response, Override = Response> = Omit<
  UseQueryOption<Response, Override>,
  'key'
> & { key?: QueryKey; id: string };

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => void;
    lastAutoTable?: { finalY: number };
  }
}

