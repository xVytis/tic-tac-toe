const resolveConfig = require('tailwindcss/resolveConfig');
const baseConfig = require('../../tailwind.config');

const config = resolveConfig(baseConfig, {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
});

module.exports = config;
