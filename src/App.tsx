import { Box, List, ListItem, Typography } from '@mui/material';
import { useGetAllEvents } from './features/api/getAllEvents';
import { Event } from './types/Event';

function App() {
  const { data: events, isLoading, error } = useGetAllEvents();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>An error occurred: {error.message}</Typography>;

  return (
    <Box>
      {events?.map((event: Event) => (
        <List>
          <ListItem>{event.title}</ListItem>
          <ListItem>{event.description}</ListItem>
          <ListItem>{event.location}</ListItem>
          <ListItem>{new Date(event.createdAt).toLocaleDateString()}</ListItem>
          <ListItem>{new Date(event.updatedAt).toLocaleDateString()}</ListItem>
        </List>
      ))}
    </Box>
  );
}

export default App;
