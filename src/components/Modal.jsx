import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { forwardRef, useEffect, useState } from 'react';
import { UseGlobalContext } from '../store/context';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function Modal({ open, setOpen }) {
  const { dispatch, state } = UseGlobalContext();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <Typography
            marginBottom={5}
            variant='h4'
            fontFamily={`${state.fontMode}`}
          >
            SETTİNGS
          </Typography>
          <Stack direction={'row'} gap={2}>
            <Box>
              <Typography paddingBottom={2} fontFamily={`${state.fontMode}`}>
                pomodoro
              </Typography>
              <TextField
                defaultValue={state.time.pomodoro}
                onChange={(e) =>
                  dispatch({
                    type: 'ChangeTime',
                    payload: { key: 'pomodoro', value: e.target.value },
                  })
                }
              />
            </Box>
            <Box>
              <Typography paddingBottom={2} fontFamily={`${state.fontMode}`}>
                short Break
              </Typography>
              <TextField
                defaultValue={state.time.shortBreak}
                onChange={(e) =>
                  dispatch({
                    type: 'ChangeTime',
                    payload: { key: 'shortBreak', value: e.target.value },
                  })
                }
              />
            </Box>
            <Box>
              <Typography paddingBottom={2} fontFamily={`${state.fontMode}`}>
                long Break
              </Typography>
              <TextField
                defaultValue={state.time.longBreak}
                onChange={(e) =>
                  dispatch({
                    type: 'ChangeTime',
                    payload: { key: 'longBreak', value: e.target.value },
                  })
                }
              />
            </Box>
          </Stack>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
            marginTop={5}
            paddingBlock={5}
            borderBottom={'1px solid rgba(215, 224, 255, 0.4)'}
            borderTop={'1px solid rgba(215, 224, 255, 0.4)'}
          >
            <Typography fontFamily={`${state.fontMode}`}>COLOR</Typography>
            <Box display={'flex'} gap={1}>
              {[
                'var(--redColor)',
                'var(--blueColor)',
                'var(--purpleColor)',
              ].map((color) => (
                <Box
                  width={'30px'}
                  height={'30px'}
                  borderRadius={'25px'}
                  sx={{
                    backgroundColor: `${color}`,
                    cursor: 'pointer',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                  }}
                  key={color}
                  onClick={() =>
                    dispatch({ type: 'setColorMode', payload: color })
                  }
                >
                  {color == state.colorMode ? '√' : ''}
                </Box>
              ))}
            </Box>
          </Box>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
            paddingBlock={5}
          >
            <Typography fontFamily={`${state.fontMode}`}>FONT</Typography>
            <Box display={'flex'} gap={1}>
              {[
                'var(--spaceMono)',
                'var(--robotoSlab)',
                'var(--kumbhSans)',
              ].map((font) => (
                <Box
                  width={'30px'}
                  height={'30px'}
                  borderRadius={'25px'}
                  sx={{
                    fontFamily: `${font}`,
                  }}
                  className={
                    font == state.fontMode ? 'choose normal' : 'normal'
                  }
                  key={font}
                  onClick={() =>
                    dispatch({ type: 'setFontMode', payload: font })
                  }
                >
                  Aa
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <Button onClick={handleClose} variant='contained'>
          Disagree
        </Button>
      </Dialog>
    </>
  );
}
