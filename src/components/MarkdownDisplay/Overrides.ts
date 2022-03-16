import { Typography } from '@mui/material';
import { MarkdownToJSX } from 'markdown-to-jsx';

/*
 * Overrides for markdown
 */
export const overrides: MarkdownToJSX.Overrides = {
  h1: {
    component: Typography,
    props: {
      variant: 'h1',
    },
  },
  h2: {
    component: Typography,
    props: {
      variant: 'h2',
    },
  },
  h3: {
    component: Typography,
    props: {
      variant: 'h3',
    },
  },
  h4: {
    component: Typography,
    props: {
      variant: 'h4',
    },
  },
  h5: {
    component: Typography,
    props: {
      variant: 'h5',
    },
  },
  h6: {
    component: Typography,
    props: {
      variant: 'h6',
    },
  },
  p: {
    component: Typography,
    props: {
      variant: 'body1',
    },
  },
  span: {
    component: Typography,
    props: {
      variant: 'body1',
    },
  },
};
