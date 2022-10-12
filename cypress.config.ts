import { defineConfig } from 'cypress';
import * as createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {

    // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
    await addCucumberPreprocessorPlugin(on, config);    
    
    on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
    );

    // Make sure to return the config object as it might have been modified by the plugin.
    return config;
}

export default defineConfig({
    env: {
        TAGS: 'not @ignore',
    },    
    chromeWebSecurity: false,
    video: false,
    viewportWidth: 1024,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 120000,
    numTestsKeptInMemory: 0,
    retries: {
        runMode: 1,
        openMode: 0,
    },
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents,
        baseUrl: 'https://google.com',
        specPattern: 'cypress/e2e/**/*.{tsx,feature}',
        excludeSpecPattern: '**/debug.feature',
        experimentalSessionAndOrigin: true,
    },
});
