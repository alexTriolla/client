import { useMutation } from 'react-query';
import { deleteEvent } from '../api/events';
import { queryClient } from '../utils/reactQuery';

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: deleteEvent,
    onMutate: () => {},
    onSuccess: async (response) => {
      console.log('delete response: ', response);
      await queryClient.invalidateQueries('allEvents');
    },
    onError: (error) => {
      console.error('Error deleting event: ', error);
    },
  });
};
