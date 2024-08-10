import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setPosts } from '@/src/redux/reducers/newPost.reducers';
import RecApiCallerFactory from '@/src/services/RecApiCallerFactory';
import { useQuery } from '@tanstack/react-query';

export const GetPosts = (reloadKey) => {
  const dispatch = useDispatch();
  const apiFactory = new RecApiCallerFactory();

  const { data, isLoading, error } = useQuery({
    queryKey: ['posts', reloadKey],
    queryFn: async () => await apiFactory.getApiImplementation('posts').getAll(),
  });

  useEffect(() => {
    if (data) {
      dispatch(setPosts(data));
    }
  }, [data]);

  return { isLoading, error };
};
