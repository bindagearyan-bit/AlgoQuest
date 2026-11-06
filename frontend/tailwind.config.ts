import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        pixelSans: ['"Pixelify Sans"', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      colors: {
        skyline: '#1B2A4A',
        primary: '#8B7FD9',
        pink: '#FF6FA0',
        mint: '#7FFFD4',
        accent: '#FFD93D',
        textNavy: '#1A2744',
        success: '#6FCF97',
        error: '#EB5757',
        dungeonBg: '#0D0B2E',
        dungeonBg2: '#1A1744',
        brickDark: '#2E1F3D',
        brickLight: '#3D2A4D',
        neonCyan: '#00F0FF',
        neonMagenta: '#FF2FD4',
      },
      backgroundImage: {
        sky: 'linear-gradient(180deg, #CDE3F7 0%, #D9BEEA 50%, #F2A9C9 100%)',
        dungeon: 'linear-gradient(180deg, #0D0B2E 0%, #1A1744 100%)',
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0,0,0,0.2)',
        pixelPress: '2px 2px 0 0 rgba(0,0,0,0.2)',
        glowCyan: '0 0 10px #00F0FF, 0 0 20px #00F0FF',
        glowMagenta: '0 0 10px #FF2FD4, 0 0 20px #FF2FD4',
      },
    },
  },
  plugins: [],
};
export default config;

