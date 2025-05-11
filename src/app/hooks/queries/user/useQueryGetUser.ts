import { useQuery } from '@tanstack/react-query';

import UsersService from '../../../services/UsersService';

import { delay } from '../../../../utils/delay';

export function useQueryGetUser() {
  const { data, isError, isFetching } = useQuery({
    enabled: true,
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      await delay(3000);

      return await UsersService.getMe();
    },
  });

  return { userData: data, isLoadingUser: isFetching, isError };
}
