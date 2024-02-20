const { defineConfig } = require('cypress')

module.exports = {
  env: { supportFile: false },
};
 defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:4200',
  },
})
