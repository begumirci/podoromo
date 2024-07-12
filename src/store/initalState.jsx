export const initialState = {
  counter: 0,
  time: {
    pomodoro: '02:00',
    shortBreak: '02:00',
    longBreak: '07:00',
  },
  currentTime: 0,
  isStart: false,
  timeKey: 'pomodoro',
  colorMode: 'var(--redColor)',
  fontMode: 'var(--spaceMono)',
};
