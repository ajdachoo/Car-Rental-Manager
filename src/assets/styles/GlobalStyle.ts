import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
  }
  
  *, *::after, *::before {
    box-sizing: inherit;
  }
  
  body {
    font-family: 'Montserrat', sans-serif;
    font-variant-numeric: tabular-nums;
    margin: 0;
    padding: 0;
    overflow-y: hidden;
  }
  
  a, button, input {
    font-family: 'Montserrat', sans-serif;
    font-variant-numeric: tabular-nums;
  }
`;