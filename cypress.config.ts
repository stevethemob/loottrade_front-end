import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // pattern for your test files
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx,js}',
    // support file for commands and hooks
    supportFile: 'cypress/support/e2e.ts',
    // base URL of your running React app
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
})