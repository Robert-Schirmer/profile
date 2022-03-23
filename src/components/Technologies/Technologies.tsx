import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { ExperienceDoc, Tech } from '../../utils/models/DocInterfaces';
import { getDocFromFirestore } from '../../utils/models/ModelUtils';
import withErrorBoundry from '../error/withErrorBoundry';
import Loading from '../Loading';

const Technologies: React.FC = () => {
  const [technologies, setTechnologies] = useState<null | Tech[]>(null);

  useEffect(() => {
    (async () => {
      const data = await getDocFromFirestore<ExperienceDoc>('siteconfigs/experience');
      setTechnologies(data.tech);
    })().catch(console.error);
  }, []);

  return technologies === null ? (
    <Loading />
  ) : (
    <Grid
      container
      justifyContent='center'
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

export default withErrorBoundry(Technologies);
