import { useQuery } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';
import { delay } from '../../../../utils/delay';

interface UseQueryGetUserProps {
  enabled: boolean;
}

export function useQueryGetUser({ enabled }: UseQueryGetUserProps) {
  const { data, isError, isLoading, isFetching, refetch } = useQuery({
    enabled,
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      await delay(4000);

      return await UsersService.getMe();
    },
  });

  return {
    user: data ?? null,
    isRefetchingUser: isFetching,
    isLoadingUser: isLoading,
    isError,
    refetch,
  };
}
