import { createGlobalStyle } from 'styled-components';

const globalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }
  body {
    font-family: Normal;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
  }
  body.fontLoaded {
    font-family: Normal;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
`;

export default globalStyle;
