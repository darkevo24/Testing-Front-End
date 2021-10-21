import Cookies from 'js-cookie';
export const getCookieByName = (name) => {
  const match = Cookies.get(name);
  if (match) return match;
  return null;
};
