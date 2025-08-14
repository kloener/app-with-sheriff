import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

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
     *   - ./utils (domain:bookings, type:utils)
     */
    'src/app/<domain>': {
      // src/app/bookings/infrastructure
      // src/app/bookings/presentation
      '<type>': ['domain:<domain>', 'type:<type>'],
      // src/app/bookings/domain/events
      // src/app/bookings/application/commands
      '<type>/<subType>': [
        'domain:<domain>',
        'type:<type>',
        'subType:<subType>',
      ],
      // src/app/bookings/presentation/components/booking-list
      // src/app/bookings/presentation/pages/booking-page
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
      'type:providers',
      'type:utils',
    ],
    /**
     * Providers for dependency injection and service providers.
     */
    'type:providers': [
      sameTag,
      'type:domain',
      'type:application',
      'type:infrastructure',
      'type:utils',
    ],
    /**
     * Routes Layer defining application routes and navigation.
     */
    'type:routes': [
      sameTag,
      'type:domain',
      'type:application',
      'type:presentation',
      'type:providers',
      'type:utils',
    ],
    /**
     * Utils Layer containing utility functions and shared logic.
     */
    'type:utils': [sameTag, 'type:domain'],
    /**
     * subTypes like "pages" or "events" or "commands" can access others of their kind.
     */
    'subType:*': [sameTag, 'domain:*', 'type:*'],

    root: ['domain:*'],
  },
};
