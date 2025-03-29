/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FA7A4F',
        secondary: '#F3EFE5',
        tertiary: '#DBD4C2',
        theme_dark: '#3A3A3A',
        theme_gray: '#f3f4f6',
        theme_red: '#FF8282',
        theme_green: '#A9FF66',
        theme_ongoing: '#FFB23D',
        theme_rejected: '#FF0000',
        theme_passed: '#19B100',
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      spacing: {
        '128': '32rem',
      },
      height: {
        '11/12': '91.666666666666666%',
        '24px': '24px',
      },
      width: {
        '1/16': '6.25%',
        '2/16': '12.5%',
        '3/16': '18.75%',
        '4/16': '25%',
        '5/16': '31.25%',
        '6/16': '37.5%',
        '7/16': '43.75%',
        '8/16': '50%',
        '9/16': '56.25%',
        '10/16': '62.5%',
        '11/16': '68.75%',
        '12/16': '75%',
        '13/16': '81.25%',
        '14/16': '87.5%',
        '15/16': '93.75%',
        '16/16': '100%',
        '24px': '24px',
      }
    },
  },
  plugins: [],
}

