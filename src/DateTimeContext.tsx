import { createContext } from 'react';

const DateTimeContext = createContext<Date|undefined>(undefined);

export default DateTimeContext;