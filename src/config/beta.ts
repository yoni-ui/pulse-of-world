import { BETA_MODE_STORAGE_KEY } from '@/types/brand';

export const BETA_MODE = typeof window !== 'undefined'
  && localStorage.getItem(BETA_MODE_STORAGE_KEY) === 'true';
