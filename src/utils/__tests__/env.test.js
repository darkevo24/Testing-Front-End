import { getEnv, DEV_ENV } from '../env';

describe('utils/env', () => {
  describe('getEnv()', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    });

    it("should return 'development' if it has localhost domain", () => {
      // mock UAT URL
      window.location.href = 'http://localhost:3000/';
      expect(getEnv()).toEqual(DEV_ENV);
    });
  });
});
