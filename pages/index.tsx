import { Button, Fade, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import Loading from '../src/components/Loading';
import useTypedText from '../src/utils/hooks/useTypedText';
import type { AboutDoc } from '../src/utils/models/DocInterfaces';
import { getDocFromFirestore } from '../src/utils/models/ModelUtils';

const Home: NextPage = () => {
  const [text, completed] = useTypedText("hi i'm rob");

  return (
    <Layout>
      <StackCenter contentMaxWidth={800}>
        <ContentContainer>
          <Typography variant='h4'>{text}</Typography>
          <Fade in={completed}>
            <Typography variant='body1'>i am a professional developer</Typography>
          </Fade>
        </ContentContainer>
        <Fade in={completed}>
          <ContentContainer>
            <Typography className='header' variant='h6'>
              ☕️ about
            </Typography>
            <AboutInfo />
          </ContentContainer>
        </Fade>
      </StackCenter>
    </Layout>
  );
};

export default Home;

const AboutInfo: React.FC = () => {
  const [aboutKey, setAboutKey] = useState<string>('short');
  const [aboutData, setAboutData] = useState<AboutDoc | null>(null);
  const aboutKeys = useMemo(() => {
    if (aboutData) {
      return Object.keys(aboutData.options);
    }
    return [];
  }, [aboutData]);

  useEffect(() => {
    (async () => {
      const about = await getDocFromFirestore<AboutDoc>('/siteconfigs/about');
      setAboutData(about);
    })();
  }, []);

  return aboutData === null ? (
    <Loading />
  ) : (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {aboutKeys.map((key) => (
          <Grid item key={key}>
            <Button onClick={() => setAboutKey(key)} variant={aboutKey === key ? 'contained' : undefined}>
              {key}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Typography variant='body1'>{aboutData.options[aboutKey] ?? 'Oops something went wrong...'}</Typography>
    </>
  );
};
