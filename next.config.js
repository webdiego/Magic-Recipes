const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    // disabled: process.env.NODE_ENV !== 'development',
    skipWaiting: true,
  },
});
