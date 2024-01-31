/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        'GridMinW': '50rem',
      },
      fontFamily: {
        Sixtyfour: ["Sixtyfour", "Sixtyfour"],
        GloriaHallelujah : ["Gloria Hallelujah", "Gloria Hallelujah"],
        Kalam: ["Kalam", "Kalam"],
      },
      gridTemplateColumns: {
        'myGrid': 'repeat(1, minmax(13rem, 1fr))',
        'myGrid2': 'repeat(2, minmax(13rem, 1fr))',
        'myGrid3': 'repeat(3, minmax(13rem, 1fr))',
        'myGrid4': 'repeat(4, minmax(13rem, 1fr))',
      },
      boxShadow: {
        'itemshadow': '5px 5px 2px darkgrey',
        'itemshadowhover': '5px 5px 1px black',
      },
      borderRadius: {
        'myRadius': '50%',
      },
    },
  },
  plugins: [],
}

