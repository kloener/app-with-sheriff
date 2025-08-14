# AppWithSheriff

[![App with Sheriff CI/CD](https://github.com/kloener/app-with-sheriff/actions/workflows/node.js.yml/badge.svg)](https://github.com/kloener/app-with-sheriff/actions/workflows/node.js.yml)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0-next.2.

It demonstrates how to integrate Sheriff and Clean Architecture principles in an Angular application. The scenario for this application include a list and detail view for Pokemon.

Clean Architecture is a software design pattern that emphasizes separation of concerns, making the application more maintainable and testable. Sheriff is a library that helps enforce these principles by providing tools for managing dependencies and enforcing architectural rules.

In addition the folder structure follows a Domain-Driven Design (DDD) approach, where the application is organized around the business domain rather than technical concerns. This allows for a more intuitive understanding of the application and its components. Note, that the domains are a bit too small for a real-world application.

Lastly, this repository can be used for new projects as a starting point, providing a solid foundation and structure for building Angular applications with Clean Architecture and Sheriff.

## Clean Architecture

Clean Architecture separates application logic from the framework, UI or any external dependencies. This allows easier implementations, testing and opens the opportunity to move the application to different platforms or frameworks in the future.

In this project I've followed the principles of Clean Architecture by organizing the code into layers:

- each **Domain** (see DDD) contains the following layers
  - **Domain Layer**: Contains the core business logic and domain entities. This layer is independent of any frameworks or external libraries.
  - **Application Layer**: Contains use cases and application-specific logic. It orchestrates the flow of data between the domain layer and the presentation layer.
  - **Presentation Layer**: Contains the UI components and presentation logic. It interacts with the application layer to display data and handle user interactions.
  - **Infrastructure Layer**: Contains external dependencies, such as API clients, database access, and other services. This layer is responsible for communicating with external systems and providing data to the application layer.

And I've added more layers: public_api, utils and ui

- **UI Layer**: Contains reusable UI components and styles. There is no dependency to the application layer. Data is provided through inputs and outputs. These kind of components are very easy to test and can be used in different parts of the application.
- **Utils Layer**: Contains utility functions and helpers that are used across the application. This layer provides common functionality that can be reused in different parts of the application. Utilities can only access the domain layer for data types and basic domain services.
- **Public API Layer**: This layer extends the infrastructure layer by providing functions specific for the surrounding framework, like `provideEventBus` function or `routes`. Additionally, it can be used to expose the application layer's functionality to other domains or external systems.

- **Shared Layer**: Contains shared utilities, constants, and types that are used across the application. This layer helps to avoid duplication and keeps the codebase clean.

- **Testing Layer**: Contains unit and integration tests for the application. This layer ensures that the application behaves as expected and helps to catch bugs early in the development process.

## Installation

Use `pnpm` to install the project dependencies. If you don't have `pnpm` installed, you can install it globally using npm:

```bash
npm install -g pnpm
```

Afterwards install packages with:

```bash
pnpm install
```

## Development server

To start a local development server, run:

```bash
pnpm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component ...
```

## Building

To build the project run:

```bash
pnpm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
pnpm run test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Links to pnpm, clean architecture, Sheriff and DDD documentation:

- [pnpm Documentation](https://pnpm.io/)
- [Clean Architecture Documentation](https://www.geeksforgeeks.org/system-design/complete-guide-to-clean-architecture/)
- [Sheriff Documentation](https://sheriff.softarc.io/docs/introduction)
- [Domain-Driven Design Documentation](https://www.domainlanguage.com/ddd/) and [All about DDD for Angular & Frontend Architectures](https://www.angulararchitects.io/blog/all-about-ddd-for-frontend-architectures-with-angular-co/) from Angular Architects
