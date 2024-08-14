import { Event } from '../types/Event';
import { axios } from '../utils/axios';

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await axios.get('api/events');
  return response.data;
};

export const deleteEvent = async (id: number): Promise<string> => {
  const response = await axios.delete(`api/events/${id}`);
  return response.data;
};

export const createNewEvent = async (newEvent: Event): Promise<Event> => {
  const response = await axios.post('api/events', {
    event: newEvent,
  });
  return response.data;
};

export const editEvent = async (
  id: number,
  updatedEvent: Partial<Event>
): Promise<Event> => {
  const response = await axios.put(`api/events/${id}`, { event: updatedEvent });
  return response.data;
};
