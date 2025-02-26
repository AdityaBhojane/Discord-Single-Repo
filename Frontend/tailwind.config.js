/** @type {import('tailwindcss').Config} */
import {nextui} from '@nextui-org/react'
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-login': "url('/src/assets/Frame.png')",
        'heroInvite': "url('/src/assets/inviteBgi.webp')",
      },
      fontFamily: { 
        'ubuntu': ['"Ubuntu"', 'serif'], 
      }, 
      ontWeight: { 
        'light': 300, 
        'regular': 400, 
        'medium': 500, 
        'bold': 700, 
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

