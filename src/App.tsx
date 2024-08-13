import { Box, Typography } from '@mui/material';
import SideMenu from './features/events/components/SideMenu';
import ListView from './features/events/components/ListView';

function App() {
  return (
    <Box
      display={'flex'}
      sx={{
        backgroundColor: '#F9F9F9',
      }}
    >
      <SideMenu />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={4}
        p={4}
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="h4" color="#505050">
          Dashboard
        </Typography>
        <ListView />
      </Box>
    </Box>
  );
}

export default App;
