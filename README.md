# AppWithSheriff

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.0-next.2.

It demonstrates how to integrate Sheriff and Clean Architecture principles in an Angular application. The scenario for this application include a list and detail view for Pokémon.

Clean Architecture is a software design pattern that emphasizes separation of concerns, making the application more maintainable and testable. Sheriff is a library that helps enforce these principles by providing tools for managing dependencies and enforcing architectural rules.

In addition the folder structure follows a Domain-Driven Design (DDD) approach, where the application is organized around the business domain rather than technical concerns. This allows for a more intuitive understanding of the application and its components. Note, that the domains are a bit too small for a real-world application.

Lastly, this repository can be used for new projects as a starting point, providing a solid foundation and structure for building Angular applications with Clean Architecture and Sheriff.

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
- [Domain-Driven Design Documentation](https://www.domainlanguage.com/ddd/)
