/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      //create a object inside the extend object and use keys in ur project
      colors: {
        primaryColor: "#2c3e50",
        secondaryColor: "#34495e",
        accentColor: "#e67e22",
        textColor: "#7f8c8d",
      },
    },
  },
  plugins: [],
};
