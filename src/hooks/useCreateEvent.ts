import { useMutation } from 'react-query';
import { queryClient } from '../utils/reactQuery';
import { createNewEvent } from '../api/events';

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: createNewEvent,
    onMutate: () => {},
    onSuccess: async (response) => {
      console.log('crete new event response:', response);
      await queryClient.invalidateQueries('allEvents');
    },
    onError: (error) => {
      console.error('Error creating a new event: ', error);
    },
  });
};
