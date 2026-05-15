// Mobile-only: always returns the deep link scheme
export const getRedirectUrl = (path = '') =>
  `seahorseclub://auth/callback${path}`;
