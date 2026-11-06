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
        woodDark: '#3E2723',
        woodBorder: '#5D4037',
        parchment: '#FFF9E6',
        success: '#4CAF50',
        error: '#D32F2F',

        // Biome Palette
        biomeVillage: '#4CAF50',
        biomeVillageDark: '#2E7D32',
        biomeCastle: '#0288D1',
        biomeCastleCyan: '#00E5FF',
        biomeIsle: '#81C784',
        biomeGlacier: '#4A6FA5',
        biomeGlacierIce: '#90CAF9',
        biomeVolcano: '#D32F2F',
        biomeVolcanoLava: '#FF9800',
        biomeCelestial: '#7E57C2',
        biomeCelestialGold: '#FFD54F',

        // Gold Node Path Colors
        goldNode: '#FFD54F',
        goldNodeEdge: '#FFB300',
        goldNodeGlow: '#FFF59D',

        // Dungeon & Visualizer Colors
        dungeonBg: '#0D0B2E',
        dungeonBg2: '#1A1744',
        brickDark: '#2E1F3D',
        brickLight: '#3D2A4D',
        neonCyan: '#00F0FF',
        neonMagenta: '#FF2FD4',
      },
      backgroundImage: {
        sunsetSky: 'linear-gradient(180deg, #F3C8DD 0%, #C7D3F5 45%, #FCE4C8 100%)',
        sky: 'linear-gradient(180deg, #F3C8DD 0%, #C7D3F5 45%, #FCE4C8 100%)',
        dungeon: 'linear-gradient(180deg, #0D0B2E 0%, #1A1744 100%)',
        parchmentGrad: 'linear-gradient(180deg, #FFFDF5 0%, #FFF4D6 100%)',
      },
      boxShadow: {
        pixel: '4px 4px 0px #1B2A4A',
        pixelWood: '4px 4px 0px #3E2723',
        pixelPress: '2px 2px 0px #1B2A4A',
        goldGlow: '0 0 15px #FFD54F, 0 0 25px #FFB300',
        cyanGlow: '0 0 15px #00F0FF, 0 0 25px #00F0FF',
        glowCyan: '0 0 10px #00F0FF, 0 0 20px #00F0FF',
        glowMagenta: '0 0 10px #FF2FD4, 0 0 20px #FF2FD4',
      },
    },
  },
  plugins: [],
};
export default config;
