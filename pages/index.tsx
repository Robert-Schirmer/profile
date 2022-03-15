import { Button, Fade, Grid, Typography } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import Loading from '../src/components/Loading';
import { firestore } from '../src/utils/firebase/app';
import useTypedText from '../src/utils/hooks/useTypedText';
import type { AboutOptionDoc } from '../src/utils/models/DocInterfaces';
import { fromFirestore } from '../src/utils/models/ModelUtils';

const Home: NextPage = () => {
  const [text, completed] = useTypedText("hi i'm rob");

  return (
    <Layout>
      <StackCenter contentMaxWidth={800} stackSpacing={8}>
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aboutData, setAboutData] = useState<AboutOptionDoc[] | null>(null);

  useEffect(() => {
    (async () => {
      const docsSnap = await getDocs(query(collection(firestore, '/siteconfigs/about/options'), orderBy('order')));
      setAboutData(docsSnap.docs.map((doc) => fromFirestore(doc)));
    })();
  }, []);

  return aboutData === null ? (
    <Loading />
  ) : (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        {aboutData.map((aboutOption, index) => (
          <Grid item key={aboutOption.docRef.id}>
            <Button onClick={() => setSelectedIndex(index)} variant={selectedIndex === index ? 'contained' : undefined}>
              {aboutOption.label}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Typography variant='body1'>{aboutData[selectedIndex].content ?? 'Oops something went wrong...'}</Typography>
    </>
  );
};
