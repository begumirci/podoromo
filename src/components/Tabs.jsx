import { Stack, Tabs, Tab } from '@mui/material';

import { UseGlobalContext } from '../store/context';
import { useEffect } from 'react';

export default function TabsComp() {
  const { value, setValue, dispatch, state } = UseGlobalContext();
  console.log(state.timeKey);

  useEffect(() => {
    if (state.timeKey == 'pomodoro') {
      setValue(0);
    } else if (state.timeKey == 'shortBreak') {
      setValue(1);
    } else if (state.timeKey == 'longBreak') {
      setValue(2);
    }
  }, [state.timeKey]);

  const handleChange = () => {
    dispatch({ type: 'ShowTime', payload: value });
  };
  console.log(value);

  return (
    <Stack>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        className='custom-tab'
      >
        {['pomodoro', 'short break', 'long break'].map((item) => (
          <Tab
            label={item}
            key={item}
            sx={{
              textTransform: 'lowercase',
              fontFamily: `${state.fontMode}`,

              '&.Mui-selected': {
                borderRadius: '50px',
                backgroundColor: `${state.colorMode}`,
                border: `1px solid ${state.colorMode}`,
                color: 'var(--darkColor) !important',
              },
            }}
          />
        ))}
      </Tabs>
    </Stack>
  );
}
