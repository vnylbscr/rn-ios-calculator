import 'styled-components';

export const COLORS = {
  backgroundBase: '#000',
  buttonBackgroundYellow: '#F1A33B',
  buttonBackgroundGray: '#A5A5A5',
  buttonBackgroundBlack: '#333333',
  textBase: '#fff',
};

export const theme = {
  colors: COLORS,
};

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
