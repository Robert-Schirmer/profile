import { Button, Grid } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { useEffect, useState } from 'react';
import { firestore } from '../../utils/firebase/app';
import type { AboutOptionDoc } from '../../utils/models/DocInterfaces';
import { fromFirestore } from '../../utils/models/ModelUtils';
import withErrorBoundry from '../error/withErrorBoundry';
import Loading from '../Loading';
import MarkdownDisplay from '../MarkdownDisplay';

const About: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aboutData, setAboutData] = useState<AboutOptionDoc[] | null>(null);

  useEffect(() => {
    (async () => {
      const docsSnap = await getDocs(query(collection(firestore, '/siteconfigs/about/options'), orderBy('order')));
      setAboutData(docsSnap.docs.map((doc) => fromFirestore(doc)));
    })().catch(console.error);
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

export default withErrorBoundry(About);
