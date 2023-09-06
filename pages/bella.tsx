import { Fade, ImageList, ImageListItem, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import type { NextPage } from 'next';
import React, { useEffect, useReducer, useRef, useState, useMemo } from 'react';
import ContentContainer from '../src/components/ContentContainer';
import Layout from '../src/components/Layout';
import StackCenter from '../src/components/Layout/StackCenter';
import useTypedText from '../src/utils/hooks/useTypedText';
import { BellasDoc } from '../src/utils/models/DocInterfaces';
import { getDocFromFirestore } from '../src/utils/models/ModelUtils';
import { getAllImageSrc } from '../src/utils/storage';

const Bella: NextPage = () => {
  const [textDisplayNum, increment] = useReducer((prevState) => prevState + 1, 0);
  const [myText, setMyText] = useState<string[]>([]);
  const [imgSrcs, setImgSrcs] = useState<string[]>([]);
  const [playlistSrc, setPlaylistSrc] = useState('');
  const timeTogether = useMemo(() => {
    return dayjs().from(dayjs('Sep 9 2022 EST'), true);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getDocFromFirestore<BellasDoc>('siteconfigs/bellas');
      setMyText(data.mys);
      setPlaylistSrc(data.playlistSrc);
    })().catch(console.error);

    (async () => {
      const srcs = await getAllImageSrc('bella');
      shuffleArray(srcs);
      setImgSrcs(srcs);
    })().catch(console.error);
  }, []);

  return (
    <Layout>
      <StackCenter contentMaxWidth={800}>
        <ContentContainer sx={{ minHeight: 450 }}>
          {myText.map((text, index) => (
            <Fade in={textDisplayNum >= index} mountOnEnter={true} key={text}>
              <TypedText onComplete={increment}>{text}</TypedText>
            </Fade>
          ))}
        </ContentContainer>
        <ContentContainer>
          <Typography variant='h5'>Happy {timeTogether} together 🎉</Typography>
        </ContentContainer>
        <ContentContainer>
          <Typography variant='h5'>
            Reflecting on our time together as partners in business, adventures and fun times, I think how lucky I am to
            be in this wonderful relationship.
          </Typography>
        </ContentContainer>
        <ContentContainer>
          <ImageList
            variant='masonry'
            cols={3}
            gap={10}
            sx={{
              img: {
                borderRadius: '10px',
              },
            }}
          >
            {imgSrcs.map((src, index) => (
              <ImageListItem key={index}>
                <img src={src} loading='lazy' alt='b&b' />
              </ImageListItem>
            ))}
          </ImageList>
        </ContentContainer>
        <ContentContainer>
          <Typography variant='h5'>
            You remain my first thought in the morning and last thought in the evening.
          </Typography>
          <br />
          <Typography variant='h5'>
            A collection of songs that make me think of us and we dance the best to (the Bella playlist release after a
            full year of collecting ☺️)
          </Typography>
        </ContentContainer>
        <ContentContainer>
          {!!playlistSrc && (
            <iframe
              style={{
                borderRadius: '12px',
              }}
              src={playlistSrc}
              width='100%'
              height='380'
              frameBorder='0'
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            />
          )}
        </ContentContainer>
        <ContentContainer>
          <Typography variant='h5'>I love you with everything I have.</Typography>
          <br />
          <Typography>Rob</Typography>
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

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

TypedText.displayName = 'TypedText';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'one year',
    yy: '%d years',
  },
});
