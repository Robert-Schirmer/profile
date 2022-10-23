import { Fade, Typography } from '@mui/material';
import type { NextPage } from 'next';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import useTypedText from '../src/utils/hooks/useTypedText';
import { BellasDoc } from '../src/utils/models/DocInterfaces';
import { getDocFromFirestore } from '../src/utils/models/ModelUtils';

const Bella: NextPage = () => {
  const [textDisplayNum, increment] = useReducer((prevState) => prevState + 1, 0);
  const [myText, setMyText] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getDocFromFirestore<BellasDoc>('siteconfigs/bellas');
      setMyText(data.mys);
    })().catch(console.error);
  }, []);

  return (
    <Layout>
      <StackCenter contentMaxWidth={800} stackSpacing={12}>
        <ContentContainer sx={{ minHeight: '600px' }}>
          {myText.map((text, index) => (
            <Fade in={textDisplayNum >= index} mountOnEnter={true} key={text}>
              <TypedText onComplete={increment}>{text}</TypedText>
            </Fade>
          ))}
        </ContentContainer>
      </StackCenter>
    </Layout>
  );
};

export default Bella;

interface TypedTextProps {
  onComplete?: () => void;
  children: string;
}

const TypedText = React.forwardRef<any, TypedTextProps>(({ onComplete, children }, ref) => {
  const [text, completed] = useTypedText(children, 70);
  const prevCompleted = useRef(completed);

  useEffect(() => {
    if (prevCompleted.current !== completed) {
      prevCompleted.current = completed;
      onComplete?.();
    }
  }, [completed, onComplete]);

  return (
    <Typography variant='h5' sx={{ marginBottom: '20px' }} ref={ref}>
      {text}
    </Typography>
  );
});

TypedText.displayName = 'TypedText';
