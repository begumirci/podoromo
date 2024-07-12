import { Container, Stack, ThemeProvider, Typography } from '@mui/material';
import TabsComp from './components/Tabs';
import { theme } from './store/ContextProvider';
import Timer from './components/Timer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ backgroundColor: '#1E213F' }} height={'100vh'}>
        <Container maxWidth='lg'>
          <Typography
            variant='h4'
            sx={{
              textAlign: 'center',
              color: 'var(--defaultColor)',
              fontWeight: 'bold',
            }}
            marginBlock={'25px'}
          >
            Pomodoro
          </Typography>
          <TabsComp />
          <Timer />
        </Container>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
