import { Button, Fade, Grid, Typography } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import Loading from '../src/components/Loading';
import MarkdownDisplay from '../src/components/MarkdownDisplay';
import { firestore } from '../src/utils/firebase/app';
import useTypedText from '../src/utils/hooks/useTypedText';
import { AboutOptionDoc, ExperienceDoc, Tech } from '../src/utils/models/DocInterfaces';
import { fromFirestore, getDocFromFirestore } from '../src/utils/models/ModelUtils';

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
            <AboutInfo />
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
      <MarkdownDisplay>{aboutData[selectedIndex].content ?? 'Oops something went wrong...'}</MarkdownDisplay>
    </>
  );
};

const Technologies: React.FC = () => {
  const [technologies, setTechnologies] = useState<null | Tech[]>(null);

  useEffect(() => {
    (async () => {
      const data = await getDocFromFirestore<ExperienceDoc>('siteconfigs/experience');
      setTechnologies(data.tech);
    })();
  }, []);

  return technologies === null ? (
    <Loading />
  ) : (
    <Grid
      container
      spacing={3}
      sx={{
        gap: '20px',
        marginBottom: '20px',
        '& .tech-image': {
          maxWidth: '100%',
          maxHeight: '80px',
        },
        '& .tech-cont': {
          gap: '10px',
          width: '100px',
        },
      }}
    >
      {technologies.map((tech) => (
        <Grid
          item
          key={tech.label}
          container
          flexDirection='column'
          alignItems='center'
          justifyContent='flex-end'
          className='tech-cont'
        >
          <img src={tech.imgSrc} alt='tech-logo' className='tech-image' />
          <Typography variant='body1'>{tech.label}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};
