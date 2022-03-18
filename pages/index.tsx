import { Fade, Typography } from '@mui/material';
import type { NextPage } from 'next';
import About from '../src/components/About';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import Technologies from '../src/components/Technologies/Technologies';
import useTypedText from '../src/utils/hooks/useTypedText';

const Home: NextPage = () => {
  const [text, completed] = useTypedText(" hi i'm rob");

  return (
    <Layout>
      <StackCenter contentMaxWidth={800} stackSpacing={15}>
        <ContentContainer>
          <Typography variant='h4'>👋{text}</Typography>
          <Fade in={completed}>
            <Typography variant='body1'>i am a professional developer</Typography>
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
