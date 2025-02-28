// @flow

export const placeholderMixin = `
  ::-webkit-input-placeholder {
    color: ##AAAAAA;
    opacity: 0.5;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :-moz-placeholder {
    color: #000;
    opacity: 0.5;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  ::-moz-placeholder {
    color: #000;
    opacity: 0.5;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :-ms-input-placeholder {
    color: #000;
    opacity: 0.5;
    -ms-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }

  :hover::-webkit-input-placeholder {
    opacity: 0.75;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :hover:-moz-placeholder {
    opacity: 0.75;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :hover::-moz-placeholder {
    opacity: 0.75;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :hover:-ms-input-placeholder {
    opacity: 0.75;
    -ms-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }

  :focus::-webkit-input-placeholder {
    opacity: 0;
    -webkit-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus:-moz-placeholder {
    opacity: 0;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus::-moz-placeholder {
    opacity: 0;
    -moz-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
  :focus:-ms-input-placeholder {
    opacity: 0;
    -ms-transition: opacity 0.35s ease-in-out;
    transition: opacity 0.35s ease-in-out;
  }
`

export const scrollbarMixin = (color: string) => `
  ::-webkit-scrollbar {
    width: 6px;
    border: none;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
    border: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${color};
    border-radius: 6px;
  }
`
