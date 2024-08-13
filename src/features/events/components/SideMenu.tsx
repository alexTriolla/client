import { Box, List, ListItem } from '@mui/material';
import React from 'react';

const SideMenu = () => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={'200px'}
      alignItems={'center'}
      height={'100vh'}
      sx={{
        backgroundColor: 'white',
      }}
    >
      <List>
        <ListItem>Dashboard</ListItem>
        <ListItem>Events</ListItem>
      </List>
    </Box>
  );
};

export default SideMenu;
