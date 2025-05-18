import { useQuery } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';

interface UseQueryGetUserProps {
  enabled: boolean;
}

export function useQueryGetUser({ enabled }: UseQueryGetUserProps) {
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    enabled,
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      return await UsersService.getMe();
    },
  });

  return {
    user: data ?? null,
    isLoadingUser: isLoading,
    isRefetchingUser: isFetching,
    isError,
    refetch,
  };
}
