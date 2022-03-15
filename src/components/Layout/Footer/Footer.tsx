import { Grid, Typography, Box } from '@mui/material';
import pack from '../../../../package.json';
import MainLogo from '../../Logo/MainLogo/MainLogo';

interface Props {
  topMargin?: number;
}

const contactEmail = 'rob@isip.coffee';

const Footer: React.FC<Props> = ({ topMargin = 100 }) => {
  return (
    <Box
      sx={{
        marginTop: `${topMargin}px`,
        padding: '20px 40px',
        backgroundColor: 'background.footer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Grid
        sx={{
          maxWidth: '800px',
          marginBottom: '20px',
        }}
        container
      >
        <Grid item container direction='column' alignItems='center' xs={12}>
          <Typography
            variant='body2'
            className='hoverable'
            onClick={() => {
              navigator.clipboard.writeText(contactEmail);
            }}
          >
            {contactEmail}
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        <Box sx={{ position: 'relative', height: '50px', width: '200px' }}>
          <MainLogo />
        </Box>
        <Typography variant='caption' sx={{ mt: '20px' }}>
          © {new Date().getFullYear()} isip.coffee
        </Typography>
        <Typography color='lightslategray' variant='caption'>
          v{pack.version}
        </Typography>
      </Grid>
    </Box>
  );
};

export default Footer;
