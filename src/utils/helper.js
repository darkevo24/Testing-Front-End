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

export const convertToPlain = (html) => {
  // Create a new div element
  var tempDivElement = document.createElement('div');
  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || '';
};

export const copyToClipboard = (text) => {
  const textToCopy = convertToPlain(text);
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    const textArea = document.createElement('textarea');
    textArea.value = convertToPlain;
    // make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};
