// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      spacing: {
        // Custom gap values
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        xl: "2rem",
      },
    },
  },
  plugins: [],
};
