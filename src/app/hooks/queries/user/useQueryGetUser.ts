import { useQuery } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';

export function useQueryGetUser() {
  const { data, isError, isFetching } = useQuery({
    enabled: true,
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      return await UsersService.getMe();
    },
  });

  return { userData: data, isLoadingUser: isFetching, isError };
}
