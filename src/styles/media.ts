import { css, CSSObject, SimpleInterpolation } from 'styled-components';

type DeviceType = 'large' | 'medium' | 'small';

const sizes: Record<DeviceType, number> = {
  large: 1200,
  medium: 768,
  small: 560,
};

const media = Object.entries(sizes).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      @media (max-width: ${value}px) {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, any>;

export default media;

//참고 블로그 https://velog.io/@syoung125/CSS-%EB%B0%98%EC%9D%91%ED%98%95-%EC%9B%B9-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0
