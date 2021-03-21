import { useQuery } from '@apollo/client';

import schema from '../schema';

export function useQueryMe(onCompleted, onError) {
  const { data, loading, refetch, client, error } = useQuery(schema.query.ME, {
    notifyOnNetworkStatusChange: true,
    onCompleted,
    onError,
  });

  return [data?.me, { loading, refetch, client, error, data }];
}
