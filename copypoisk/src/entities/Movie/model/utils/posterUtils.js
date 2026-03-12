import placeholder from '@/assets/images/placeholder.svg';

export const checkPoster = (url) => {
  if (!url || url.includes('no-poster') || url.includes('placeholder')) {
    return placeholder;
  }
  return url;
};