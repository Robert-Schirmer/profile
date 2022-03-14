import { responsiveFontSizes } from '@mui/material';
import createMyTheme from './CustomTheme';
import { sharedPalette, sharedTheme } from './shared';

// Create a theme instance.
let theme = createMyTheme({
  // Can't get this typed correctly all the way 🤔
  //@ts-ignore
  palette: {
    mode: 'light',
    primary: {
      main: '#9A031E',
    },
    secondary: {
      main: '#73A580',
    },
    text: {
      primary: '#030303',
      light: '#F8F0E4',
      dark: '#030303',
    },
    error: {
      main: '#D81159',
    },
    background: {
      default: '#F8F0E4',
      content: '#F8F0E4',
      header: '#F8F0E4',
      footer: '#F8F0E4',
    },
    ...sharedPalette,
  },
  ...sharedTheme,
});

theme = responsiveFontSizes(theme);

export default theme;
