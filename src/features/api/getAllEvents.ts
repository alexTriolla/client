import { useQuery } from 'react-query';
import { getAllEvents } from '../../api/events';
import { Event } from '../../types/Event';

export const useGetAllEvents = () => {
  return useQuery<Event[], Error>(['allEvents'], getAllEvents, {
    enabled: true,
  });
};
