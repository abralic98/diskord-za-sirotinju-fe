module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // adjust to your structure
    "./assets/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern:
        /(bg|text|border|ring|stroke|fill)-(red|green|blue|yellow|indigo|purple|pink|gray|slate|zinc|neutral|stone|amber|orange|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      spacing: {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        xl: "2rem",
      },
    },
  },
  plugins: [],
};
