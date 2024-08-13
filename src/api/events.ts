import { Event } from '../types/Event';
import { axios } from '../utils/axios';

export const getAllEvents = async (): Promise<Event[]> => {
  const response = await axios.get('api/events');
  return response.data;
};
