import { requestWithAuth } from "@/lib/graphql/client";
import {
  useInfiniteQuery,
} from "@tanstack/react-query";

type PaginationArgs = {
  queryKey: any[];
  document: any;
  variables: Record<string, any>;
  getPageParam?: (lastPage: any) => number | undefined;
  pageSize?: number;
};

export function usePagination<T>({
  queryKey,
  document,
  variables,
  getPageParam,
  pageSize = 10,
}: PaginationArgs) {
  return useInfiniteQuery<T>({
    queryKey,
    queryFn: async ({ pageParam = 0 }): Promise<T> => {
      return await requestWithAuth<T>(document, {
        ...variables,
        page: pageParam,
        size: pageSize,
      });
    },
    getNextPageParam:
      getPageParam ??
      ((lastPage: any) => {
        const currentPage = lastPage?.getMessagesByRoomId?.number ?? 0;
        const totalPages = lastPage?.getMessagesByRoomId?.totalPages ?? 0;
        return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
      }),
    initialPageParam: 0,
  });
}

