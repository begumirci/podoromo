import { initialState } from './initalState';

export function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'Increment': {
      return {
        ...state,
        counter: state.counter + payload,
      };
    }

    case 'ChangeTime': {
      const { key, value } = payload;
      return {
        ...state,
        time: {
          ...state.time,
          [key]: value,
        },
      };
    }

    case 'ShowTime': {
      return {
        ...state,
        currentTime: payload,
      };
    }
    case 'IsStart': {
      return {
        ...state,
        isStart: payload,
      };
    }
    case 'setTimeKey': {
      return {
        ...state,
        timeKey: payload,
      };
    }

    case 'setColorMode': {
      return {
        ...state,
        colorMode: payload,
      };
    }
    case 'setFontMode': {
      return {
        ...state,
        fontMode: payload,
      };
    }

    default:
      return state;
  }
}
