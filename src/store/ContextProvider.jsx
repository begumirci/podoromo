import { useReducer, useState } from 'react';
import { GlobalContext } from './context';
import { reducer } from './reducer';
import { initialState } from './initalState';
import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    red: '#f87070',
    blue: '#70f3f8',
    purple: '#d881f8',
  },
});

export default function ContextProvider({ children }) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{ state, dispatch, open, setOpen, value, setValue }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
