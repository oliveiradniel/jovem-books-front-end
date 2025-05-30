import { useQuery } from '@tanstack/react-query';

import GoogleBooksService, {
  TGoogleBookSearchParams,
} from '../../../services/GoogleBooksService';

import { TTypeOfSearch } from '../../../../pages/privateRoutes/GoogleBooks/components/RadioButtons';

interface UseQueryGetGoogleBooks {
  searchTerm: string;
  selected: TTypeOfSearch;
}

export function useQueryGetGoogleBooks({
  searchTerm,
  selected,
}: UseQueryGetGoogleBooks) {
  const { data, isLoading, isError, refetch } = useQuery({
    enabled: searchTerm.length > 0,
    queryKey: ['google-books', selected, searchTerm],
    queryFn: async () => {
      const params: TGoogleBookSearchParams =
        selected === 'title'
          ? {
              title: searchTerm.toString(),
            }
          : {
              author: searchTerm.toString(),
            };

      const results = await GoogleBooksService.searchGoogleBooks(params);

      return results;
    },
  });

  return {
    booksList: data ?? [],
    isLoadingBooks: isLoading,
    hasError: isError,
    tryAgain: refetch,
  };
}
