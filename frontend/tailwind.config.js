/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins"],
        inter: ["Inter"],
        os: ["Open Sans"],
        mons: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
