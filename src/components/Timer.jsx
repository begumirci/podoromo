import {
  Box,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { UseGlobalContext } from '../store/context';
import Modal from './Modal';

import { useEffect, useState } from 'react';

export default function Timer() {
  const { dispatch, state, setOpen, open } = UseGlobalContext();
  const [timeKey, setTimeKey] = useState(state.timeKey);
  const [timeValue, setTimeValue] = useState(state.time[timeKey]);
  const [cycle, setCycle] = useState(0);
  const [progress, setProgress] = useState(0);

  console.log(state.time[timeKey]);

  useEffect(() => {
    setTimeKey(state.timeKey);
    setTimeValue(state.time[state.timeKey]);
  }, [state.timeKey, state.time]);

  useEffect(() => {
    if (state.isStart) {
      let totalTime = convertToSeconds(state.time[timeKey]);

      let interval = setInterval(() => {
        setTimeValue((item) => {
          let allTime = item.split(':');
          let minutes = Number(allTime[0]);
          let seconds = Number(allTime[1]);

          if (minutes <= 10) {
            minutes = `0${minutes}`;
          }

          if (seconds > 10) {
            seconds -= 1;
          } else if (seconds <= 10 && seconds !== 0) {
            seconds = `0${seconds - 1}`;
          } else {
            if (minutes <= 10) {
              minutes = `0${minutes - 1}`;
              seconds = 59;
            } else {
              minutes -= 1;
              seconds = 59;
            }
          }

          if (minutes == 0 && seconds == 0) {
            clearInterval(interval);
            handleCycleCompletion();

            return state.time[timeKey];
          }
          let remainingTime = convertToSeconds(`${minutes}:${seconds}`);
          setProgress(((totalTime - remainingTime) / totalTime) * 100);

          return `${minutes.toString()}:${seconds.toString()}`;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [state.isStart, state.time, timeKey, cycle]);

  const handleCycleCompletion = () => {
    if (timeKey === 'pomodoro') {
      if (cycle === 2) {
        dispatch({ type: 'setTimeKey', payload: 'longBreak' });
        setCycle(0);
      } else {
        dispatch({ type: 'setTimeKey', payload: 'shortBreak' });
        setCycle(cycle + 1);
      }
    } else {
      dispatch({ type: 'setTimeKey', payload: 'pomodoro' });
      if (cycle === 3) {
        return;
      }
    }
    setProgress(0);
  };

  function convertToSeconds(time) {
    let [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  return (
    <Stack>
      <Stack
        className='timer'
        width={'410px'}
        height={'410px'}
        margin={'auto'}
        marginTop={'50px'}
        padding={'22px'}
      >
        <Stack
          width={'366px'}
          height={'366px'}
          margin={'auto'}
          padding={'13.5px'}
          position='relative'
          sx={{ backgroundColor: 'var(--darkColor)', borderRadius: '50%' }}
        >
          <CircularProgress
            variant='determinate'
            value={progress}
            size={339}
            thickness={2}
            sx={{
              color: `${state.colorMode}`,
              position: 'absolute',
            }}
          />
          <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            textAlign='center'
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            color='var(--defaultColor)'
            onClick={() =>
              dispatch({ type: 'IsStart', payload: !state.isStart })
            }
          >
            <Typography
              fontSize={'90px'}
              fontFamily={state.fontMode}
              color={'#D7E0FF'}
              paddingBottom={'20px'}
            >
              {timeValue}
            </Typography>
            <Typography
              textAlign={'center'}
              fontFamily={state.fontMode}
              color={'#D7E0FF'}
              fontWeight={'700'}
              lineHeight={'21px'}
              letterSpacing={'12px'}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: `${state.colorMode}`,
                },
              }}
            >
              {state.isStart ? 'PAUSE' : 'START'}
            </Typography>
          </Box>
        </Stack>
      </Stack>
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          color: 'var(--defaultOpacitColor)',
          margin: 'auto',
          marginTop: '50px',
          fontSize: 'large',
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Modal open={open} setOpen={setOpen} />
    </Stack>
  );
}
