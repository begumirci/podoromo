import { createContext, useContext } from 'react';

export const GlobalContext = createContext();

export function UseGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) throw Error('Context Problem');

  return context;
}
