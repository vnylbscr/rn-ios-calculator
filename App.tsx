import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import Calculator from './src/components/Calculator';
import StyledSafeAreaView from './src/components/SafeAreaView';
import { theme } from './src/lib/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledSafeAreaView>
        <StatusBar style='light' />
        <Calculator />
      </StyledSafeAreaView>
    </ThemeProvider>
  );
};

export default App;
