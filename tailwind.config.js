/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      display:['Poppins','sans Serif']
    },
    extend: {
      colors:{
        primary:'#05B6D3',
        secondary:'#EF863E'
      },
      screens: {
        // Custom breakpoints
        xs: '0px', },
        backgroundImage: {
          'login-image': "url('/assets/nature.jpg')", // Use absolute path starting from `/`
          'signup-image': "url('/assets/butterfly.jpg')",
        },
    },
  },
  plugins: [
    function ({ addBase }) {
        addBase({
            'input[type="password"]': {
                '-ms-reveal': 'none', // Disable Edge's native eye icon
                '-webkit-text-security': 'none', // Safari fallback
            },
        });
    },
],
}

