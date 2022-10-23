import { Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

const MainLogo: React.FC = () => {
  const router = useRouter();

  const emojis = router.pathname === '/bella' || router.query.redirect === '/bella' ? '🍵 + 🤺' : '☕️ + 👨‍💻';

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
      <Typography variant='h5'>{emojis}</Typography>
    </Box>
  );
};

export default MainLogo;
