import { getCookieByName } from '../getCookie';
import Cookies from 'js-cookie';

describe('utils/getCookie', () => {
  describe('getCookieByName()', () => {
    it('should return null value', () => {
      expect(getCookieByName('foo')).toEqual(null);
    });

    it('should return null value', () => {
      Cookies.set('foo', 'bar');
      expect(getCookieByName('foo')).toEqual('bar');
      Cookies.remove('foo');
    });
  });
});
