import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FCFCF4',
        ink: '#141414',
        accent: '#FF5623'
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        editorial: '-0.04em'
      }
    }
  },
  plugins: []
};

export default config;
