import { Button, Grid, Link as MuiLink } from '@mui/material';
import { useEffect, useState } from 'react';
import type { LinksDoc } from '../../utils/models/DocInterfaces';
import { getDocFromFirestore } from '../../utils/models/ModelUtils';
import Loading from '../Loading';

const OutboundLinks: React.FC = () => {
  const [resumeData, setResumeData] = useState<LinksDoc | null>(null);

  useEffect(() => {
    (async () => {
      const docData = await getDocFromFirestore<LinksDoc>('/siteconfigs/links');
      setResumeData(docData);
    })().catch(console.error);
  }, []);

  return resumeData === null ? (
    <Loading />
  ) : (
    <Grid container spacing={2}>
      {resumeData.links.map((link) => (
        <Grid item key={link.label}>
          <MuiLink href={link.link} target='_blank' rel='noreferrer'>
            <Button>{link.label}</Button>
          </MuiLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default OutboundLinks;
