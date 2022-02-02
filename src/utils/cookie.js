import Cookies from 'js-cookie';
import { safeParse, safeStringify } from './helper';
import bn from './bemNames';

const bem = bn('cookie');

export const cookieKeys = {
  token: bem.e('token'),
  user: bem.e('user'),
  isTermAndConditionAccepted: bem.e('isTermAndConditionAccepted'),
  isRecaptchaEnabled: bem.e('recaptchaEnabled'),
};

export const getCookieByName = (name) => {
  const match = Cookies.get(name);
  if (match) {
    return safeParse(match);
  }
  return null;
};

export const setCookie = (name, value) => {
  Cookies.set(name, safeStringify(value));
};

export const removeAllCookie = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};
