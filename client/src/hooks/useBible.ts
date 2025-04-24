import { useContext } from 'react';
import { BibleContext } from '@/context/BibleContext';

export const useBible = () => {
  const context = useContext(BibleContext);
  
  if (context === undefined) {
    throw new Error('useBible must be used within a BibleProvider');
  }
  
  return context;
};
