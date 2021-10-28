export const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const safeStringify = (value) => {
  try {
    if (['string', 'number'].includes(typeof value)) {
      return `${value}`;
    }
    return JSON.stringify(value);
  } catch (error) {
    return null;
  }
};

export const getQueryString = (params) => {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
};

export const submitForm = (id) => () => {
  const formNode = document.getElementById(id);
  if (formNode) {
    const submitButton = formNode.querySelector('button[type="submit"]');
    submitButton.click();
  }
};
