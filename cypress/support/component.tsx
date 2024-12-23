// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { ReactQueryClientProvider } from '~/app/providers/reactQueryClientProvider'
import './commands'
import { mount } from 'cypress/react18'
import { Notifications } from '@mantine/notifications'

import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  const { ...mountOptions } = options;
  const wrapped = (
    <ReactQueryClientProvider>
      <MantineProvider>
        <Notifications/>
          {component}
      </MantineProvider>
    </ReactQueryClientProvider>
  );


  return mount(wrapped, mountOptions);

})

// Example use:
// cy.mount(<MyComponent />)