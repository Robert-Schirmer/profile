import { Box, Fade, Grid, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import About from '../src/components/About';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import OutboundLinks from '../src/components/OutboundLinks';
import Technologies from '../src/components/Technologies/Technologies';
import useTypedText from '../src/utils/hooks/useTypedText';

const Home: NextPage = () => {
  const [text, completed] = useTypedText(" hi i'm rob");

  return (
    <Layout>
      <StackCenter contentMaxWidth={800} stackSpacing={12}>
        <ContentContainer>
          <Typography variant='h4' sx={{ marginBottom: '20px' }}>
            👋{text}
          </Typography>
          <Fade in={completed}>
            <Stack spacing={3}>
              <Grid container justifyContent='center'>
                <ProfilePic />
              </Grid>
              <Typography variant='body1'>
                i am a professional software developer located in <b>Ann Arbor, Michigan</b>.
              </Typography>
              <Grid>
                <OutboundLinks />
              </Grid>
            </Stack>
          </Fade>
        </ContentContainer>
        <Fade in={completed}>
          <ContentContainer>
            <Typography className='header' variant='h5'>
              ☕️ about
            </Typography>
            <About />
          </ContentContainer>
        </Fade>
        <Fade in={completed}>
          <ContentContainer>
            <Typography className='header' variant='h5'>
              👨‍💻 technologies i have experience with
            </Typography>
            <Technologies />
          </ContentContainer>
        </Fade>
      </StackCenter>
    </Layout>
  );
};

export default Home;

const picSize = 200;
const ProfilePic: React.FC = () => {
  return (
    <Box
      sx={{
        borderRadius: `${picSize}px`,
        border: (theme) => `3px solid ${theme.palette.primary.main}`,
        height: `${picSize}px`,
        width: `${picSize}px`,
        overflow: 'hidden',
      }}
    >
      <Image height={`${picSize}px`} width={`${picSize}px`} src='/imgs/profile.jpeg' alt='Profile pic' />
    </Box>
  );
};
