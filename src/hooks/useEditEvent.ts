import { useMutation } from 'react-query';
import { editEvent } from '../api/events';
import { queryClient } from '../utils/reactQuery';
import { Event } from '../types/Event';

export const useEditEvent = () => {
  return useMutation({
    mutationFn: ({
      id,
      updatedEvent,
    }: {
      id: number;
      updatedEvent: Partial<Event>;
    }) => editEvent(id, updatedEvent),
    onMutate: () => {
      // Optional: You can add any optimistic update logic here
    },
    onSuccess: async (response) => {
      console.log('Edit response: ', response);
      await queryClient.invalidateQueries('allEvents'); // Refresh the events list
    },
    onError: (error) => {
      console.error('Error editing event: ', error);
    },
  });
};
