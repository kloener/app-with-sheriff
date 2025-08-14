import { anyTag, sameTag, SheriffConfig } from '@softarc/sheriff-core';

/**
 * Clean Architecture Configuration for Sheriff
 *
 * This configuration enforces Clean Architecture principles:
 * - Domain layer (entities, use cases) has no dependencies on outer layers
 * - Application layer can depend on domain layer
 * - Infrastructure layer can depend on domain and application layers
 * - Presentation layer can depend on all inner layers (normally), but in our case "Infrastructure" access is not
 * allowed.
 */

export const config: SheriffConfig = {
  enableBarrelLess: true,
  modules: {
    /**
     * Samples
     * - src/app/bookings (domain:bookings)
     *   - ./domain (domain:bookings, type:domain)
     *   - ./application (domain:bookings, type:application)
     *   - ./infrastructure (domain:bookings, type:infrastructure)
     *   - ./presentation (domain:bookings, type:presentation)
     *   - ./ui (domain:bookings, type:ui)
     *   - ./utils (domain:bookings, type:utils)
     *   - ./page (domain:bookings, type:page)
     *   - ./public_api (domain:bookings, type:public_api)
     */
    'src/app/<domain>': {
      // src/app/bookings/infrastructure
      '<type>': ['domain:<domain>', 'type:<type>'],
      // src/app/bookings/domain/events
      '<type>/<subType>': [
        'domain:<domain>',
        'type:<type>',
        'subType:<subType>',
      ],
      // src/app/presentation/infrastructure
      '<type>/<subType>/<subFolder>': [
        'domain:<domain>',
        'type:<type>',
        'subType:<subType>',
      ],
    },
  },
  depRules: {
    /**
     * Domains can access themselves and shared domains by default.
     */
    'domain:*': [sameTag, 'domain:shared'],

    /**
     * API Layer for other domains and root or the application shell.
     */
    'type:public_api': [
      sameTag,
      'type:domain',
      'type:application',
      'type:infrastructure',
      'type:page',
    ],
    /**
     * Domain Layer containing entities, value objects, and domain services.
     */
    'type:domain': [sameTag, 'type:utils'],
    /**
     * Application Layer containing use cases, application services, and ports.
     */
    'type:application': [sameTag, 'type:domain', 'type:utils'],
    /**
     * Infrastructure Layer containing repositories, adapters, and external services.
     */
    'type:infrastructure': [
      sameTag,
      'type:domain',
      'type:application',
      'type:utils',
    ],
    /**
     * Presentation Layer containing components and UI logic.
     */
    'type:presentation': [
      sameTag,
      'type:domain',
      'type:application',
      'type:public_api', // Note, currently only needed for integration-tests.
      'type:ui',
      'type:utils',
    ],
    /**
     * Page Layer containing page components.
     */
    'type:page': [
      'type:presentation',
      'type:domain',
      'type:application',
      'type:public_api', // Note, currently only needed for integration-tests.
      'type:ui',
      'type:utils',
    ],
    /**
     * UI Layer containing reusable UI components (aka dumb components).
     */
    'type:ui': [sameTag, 'type:utils', 'type:domain'],
    /**
     * Utils Layer containing utility functions and shared logic.
     */
    'type:utils': [sameTag, 'type:domain'],

    'subType:*': [anyTag],

    root: ['domain:*', 'type:public_api', 'type:page'],
  },
};
