import { getEnv, DEV_ENV, UAT_ENV, PRODUCTION_ENV } from '../env';

describe('utils/env', () => {
  describe('getEnv()', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
      },
    });

    // it("should return 'uat' if it has uat domain", () => {
    //   // mock UAT URL
    //   window.location.href = '';
    //   expect(getEnv()).toEqual(UAT_ENV);
    // });
    //
    // it("should return 'production' if it has production domain", () => {
    //   // mock UAT URL
    //   window.location.href = '';
    //   expect(getEnv()).toEqual(PRODUCTION_ENV);
    // });

    it("should return 'development' if it has localhost domain", () => {
      // mock UAT URL
      window.location.href = 'http://localhost:3000/';
      expect(getEnv()).toEqual(DEV_ENV);
    });
  });
});
