import { atom, selector } from 'recoil';

export const windowWidth = atom({
  key: 'windowWidth',
  default: window.innerWidth,
});

export const BannerWidth = selector({
  key: 'bannerSize',
  get: ({ get }) => {
    const width = get(windowWidth);
    if (width < 560) {
      return 'w500';
    } else {
      return '';
    }
  },
});

export const slideCnt = selector({
  key: 'slideCnt',
  get: ({ get }) => {
    const width = get(windowWidth);
    if (width > 1400) {
      return 6;
    } else if (width > 1130) {
      return 5;
    } else if (width > 900) {
      return 4;
    } else if (width > 680) {
      return 3;
    } else if (width > 250) {
      return 2;
    } else {
      return 1;
    }
  },
});
