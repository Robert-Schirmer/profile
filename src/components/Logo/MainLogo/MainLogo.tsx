import { Typography, Box } from '@mui/material';

const MainLogo: React.FC = () => {
  return (
    <Box
      sx={{
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h5'>☕️ + 👨‍💻</Typography>
    </Box>
  );
};

export default MainLogo;
