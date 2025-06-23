// utils/storage.ts
import { MMKV } from 'react-native-mmkv';

let mmkvInstance: MMKV | null = null;

export const getMmkvStorage = () => {
  if (!mmkvInstance) {
    mmkvInstance = new MMKV();
  }
  return mmkvInstance;
};

export const mmkvAdapter = {
  getItem: (key: string) => {
    return Promise.resolve(getMmkvStorage().getString(key) || null);
  },
  setItem: (key: string, value: string) => {
    getMmkvStorage().set(key, value);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    getMmkvStorage().delete(key);
    return Promise.resolve();
  },
};

// Add onboarding status functions
export const getOnboardingStatus = (): boolean => {
  return getMmkvStorage().getBoolean('onboardingComplete') || false;
};

export const setOnboardingComplete = () => {
  getMmkvStorage().set('onboardingComplete', true);
};