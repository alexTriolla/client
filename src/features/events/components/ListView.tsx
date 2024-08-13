import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Drawer,
  Button,
  TextField,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useGetAllEvents } from '../../../hooks/useGetAllEvents';
import { useDeleteEvent } from '../../../hooks/useDeleteEvent';
import { Event } from '../../../types/Event';
import { useEditEvent } from '../../../hooks/useEditEvent';

const ListView = () => {
  const { data: events, isLoading, error } = useGetAllEvents();
  const deleteMutation = useDeleteEvent();
  const editMutation = useEditEvent();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>An error occurred: {error.message}</Typography>;

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedEvent(null);
  };

  const handleSave = () => {
    // Handle save action, perhaps using the editEvent hook
    console.log('Save changes', selectedEvent);
    if (!selectedEvent) return;
    editMutation.mutate({ id: selectedEvent.id, updatedEvent: selectedEvent });
    handleDrawerClose();
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
        p={2}
        sx={{
          backgroundColor: 'white',
          borderRadius: '12px',
          border: '1px solid #F4F4F4',
        }}
      >
        <Typography variant="h5">Events</Typography>
        <TableContainer>
          <Table
            sx={{
              minWidth: 650,
              '& .MuiTableCell-root': {
                fontSize: '14px',
                fontFamily: 'sans, sans-serif',
                color: '#505050',
              },
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Location</TableCell>
                <TableCell align="right">Created Date</TableCell>
                <TableCell align="right">Updated Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>#{row.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">
                    {new Date(row.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(row.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Drawer for editing an event */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{ '& .MuiDrawer-paper': { width: 300, padding: 2 } }}
      >
        <Typography variant="h6">Edit Event</Typography>
        {selectedEvent && (
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <TextField
              label="Title"
              value={selectedEvent.title}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, title: e.target.value })
              }
            />
            <TextField
              label="Description"
              value={selectedEvent.description}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  description: e.target.value,
                })
              }
            />
            <TextField
              label="Location"
              value={selectedEvent.location}
              onChange={(e) =>
                setSelectedEvent({ ...selectedEvent, location: e.target.value })
              }
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        )}
      </Drawer>
    </Box>
  );
};

export default ListView;
