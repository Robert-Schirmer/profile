import { responsiveFontSizes } from '@mui/material';
import createMyTheme from './CustomTheme';
import { sharedPalette, sharedTheme } from './shared';

// Create a theme instance.
let theme = createMyTheme({
  // Can't get this typed correctly all the way 🤔
  //@ts-ignore
  palette: {
    mode: 'dark',
    primary: {
      main: '#06BCC1',
    },
    secondary: {
      main: '#73A580',
    },
    text: {
      primary: '#F8F0E4',
      light: '#F8F0E4',
      dark: '#030303',
    },
    error: {
      main: '#D81159',
    },
    background: {
      default: '#2C423F',
      content: '#2C423F',
      header: '#2C423F',
      footer: '#2C423F',
    },
    ...sharedPalette,
  },
  ...sharedTheme,
});

theme = responsiveFontSizes(theme);

export default theme;
