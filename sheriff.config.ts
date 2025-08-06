import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

/**
 * Clean Architecture Configuration for Sheriff
 *
 * This configuration enforces Clean Architecture principles:
 * - Domain layer (entities, use cases) has no dependencies on outer layers
 * - Application layer can depend on domain layer
 * - Infrastructure layer can depend on domain and application layers
 * - Presentation layer can depend on all inner layers
 *
 * Layers (from inner to outer):
 * 1. Domain (entities, value objects, domain services)
 * 2. Application (use cases, application services, ports)
 * 3. Infrastructure (repositories, adapters, external services)
 * 4. Presentation (components, controllers, UI logic)
 */

export const config: SheriffConfig = {
  enableBarrelLess: true,
  modules: {
    'src/app/shared/*': ['domain:shared', 'type:ui'],
    /**
     * Samples
     * - src/app/bookings (domain:bookings)
     *   - ./domain (domain:bookings, type:domain)
     *   - ./application (domain:bookings, type:application)
     *   - ./infrastructure (domain:bookings, type:infrastructure)
     *   - ./presentation (domain:bookings, type:presentation)
     *   - ./page (domain:bookings, type:page)
     */
    'src/app/<domain>/<type>': ['domain:<domain>', 'type:<type>'],
  }, // apply tags to your modules
  depRules: {
    'domain:*': [sameTag, 'domain:shared'],

    'type:domain': [sameTag, 'type:utils'],
    'type:application': [sameTag, 'type:domain', 'type:utils'],
    'type:infrastructure': [sameTag, 'type:domain', 'type:application', 'type:utils'],
    'type:presentation': [sameTag, 'type:domain', 'type:application', 'type:infrastructure', 'type:ui', 'type:utils'],
    'type:ui': [sameTag, 'type:domain'],
    'type:utils': [sameTag, 'type:domain'],
    'type:page': ['type:presentation'],

    root: ['domain:*', 'type:page'],
  },
};
