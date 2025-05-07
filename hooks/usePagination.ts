import { requestWithAuth } from "@/lib/graphql/client";
import { useInfiniteQuery } from "@tanstack/react-query";

type PaginationArgs<TData, TField extends keyof TData> = {
  queryKey: any[];
  document: any;
  variables: Record<string, any>;
  dataField: TField;
  getPageParam?: (lastPage: TData) => number | undefined;
  pageSize?: number;
};

export function usePagination<TData, TField extends keyof TData>({
  queryKey,
  document,
  variables,
  dataField,
  getPageParam,
  pageSize = 10,
}: PaginationArgs<TData, TField>) {
  return useInfiniteQuery<TData>({
    queryKey,
    queryFn: async ({ pageParam = 0 }): Promise<TData> => {
      return await requestWithAuth<TData>(document, {
        ...variables,
        page: pageParam,
        size: pageSize,
      });
    },
    getNextPageParam:
      getPageParam ??
      ((lastPage: TData) => {
        const paginationData = lastPage[dataField] as any;
        const currentPage = paginationData?.number ?? 0;
        const totalPages = paginationData?.totalPages ?? 0;
        return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
      }),
    initialPageParam: 0,
  });
}
