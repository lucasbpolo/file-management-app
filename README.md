# File Management Application

A clean architecture implementation using Nx with shared business logic consumed by a Next.js frontend application.

## Project Structure

```text
.
├── apps/
│   └── next-app/          # Next.js application (presentation layer)
├── libs/
│   ├── shared-data/       # Data services and types (domain layer)
│   └── file-management/   # Business logic library (clean architecture)
│       ├── entities/      # Domain entities
│       └── use-cases/     # Business use cases
└── package.json
```

## Features

- **Clean Architecture**: Business logic separated in a shared library following Clean Architecture principles
- **Streaming Data**: Server-sent events for efficient data loading
- **Virtualized Tables**: High-performance rendering of hundreds of items
- **Accessibility**: Full ARIA support and keyboard navigation
- **Comprehensive Testing**: Unit tests for business logic and React components
- **Separation of Concerns**: Business logic is framework-agnostic and reusable

## Getting Started

### Prerequisites

- Node.js 20+ (recommended) or >= 18.17.0
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run start:next-app
```

Visit <http://localhost:3000>

### Building

Build all projects:

```bash
npm run build
```

Build individual projects:

```bash
npm run build:next-app
npm run build:shared-data
npm run build:file-management
```

### Production Server

After building, you can run the production server on a different port:

```bash
npm run start:next-app:prod
```

This will start the production server on port 4000. Visit <http://localhost:4000>

**Note**: Make sure you've run `npm run build` first to build all projects.

### Testing

Run all tests:

```bash
npm test
```

Run specific test suites:

```bash
npm run test:shared-data
npm run test:next-app
npm run test:file-management
```

## Application Features

### File Table

The application features:

- **Virtualized List**: Efficient rendering of 500+ items using `@tanstack/react-virtual`
- **Streaming Data**: Data loads incrementally via server-sent events
- **Selection Controls**:
  - Individual checkboxes for each row (only available items can be selected)
  - Select-all / Unselect-all checkbox
  - Selection count display
- **Download Button**: Shows alert with path and device of selected items
- **States**: Loading, error, and empty states with proper ARIA attributes
- **Accessibility**: Full keyboard navigation, screen reader support, proper ARIA labels

## Architecture

### Clean Architecture Layers

The project follows Clean Architecture principles with clear separation of concerns:

#### 1. **Domain Layer** (`libs/shared-data`)

- Type definitions (`FileItem`, `FileStatus`)
- Data services (`getData`, `getDataStream`)
- Data generation (`generateMockData`)

#### 2. **Business Logic Layer** (`libs/file-management`)

- **Entities** (`entities/`):
  - `SelectionState` - Selection state entity
  - Re-exports `FileItem` from shared-data

- **Use Cases** (`use-cases/`):
  - `getAvailableItems` - Filters file items to only include available ones
  - `getSelectionState` - Calculates selection state (all selected, some selected, count)
  - `selectAllAvailable` - Toggles selection of all available items
  - `toggleItemSelection` - Toggles selection of a single item
  - `formatSelectedForDownload` - Formats selected items for download/export
  - `getSelectedItems` - Gets the currently selected file items

All use cases are:

- Framework-agnostic (pure functions)
- Fully unit tested
- Reusable across different frontend frameworks

#### 3. **Application Layer** (`apps/next-app`)

- API routes (`app/api/data/route.ts`)
- Custom hooks (`hooks/useFileData.ts`) - Data fetching and state management
- Page components (`app/table/page.tsx`)

#### 4. **Presentation Layer** (`apps/next-app`)

- React components (`components/FileTable.tsx`) - Acts as an adapter
- UI logic and user interactions
- Styling and layout

### Architecture Benefits

- **Framework Independence**: Business logic can be used with React, Vue, Angular, or vanilla JavaScript
- **Testability**: Use cases are pure functions, easy to unit test
- **Reusability**: Same business logic can power multiple frontend applications
- **Maintainability**: Business rules are centralized in one place
- **Separation of Concerns**: Clear boundaries between layers

## Testing

### Business Logic Tests

Located in `libs/file-management/src/use-cases/*.spec.ts`:

- Tests for all use cases (selection, filtering, formatting)
- Pure function testing (no framework dependencies)
- 19+ unit tests covering all business logic

Located in `libs/shared-data/src/lib/*.spec.ts`:

- Tests for `getData` function
- Tests for `getDataStream` generator
- Data validation tests

### Component Tests

Located in `apps/next-app/src/components/*.spec.tsx`:

- React Testing Library tests
- User interaction tests
- Accessibility tests
- State management tests

## Deployment

### Build Scripts

The project includes build scripts in `package.json`:

- `build`: Build all projects
- `build:next-app`: Build Next.js app
- `build:shared-data`: Build shared-data library
- `build:file-management`: Build file-management library

### Production Server

After building, you can run the production server locally:

```bash
npm run start:next-app:prod
```

This will start the production server on port 4000. Visit <http://localhost:4000>

## Technologies

- **Nx**: Monorepo tooling
- **Next.js**: React framework
- **TypeScript**: Type safety
- **@tanstack/react-virtual**: Virtualization
- **Jest**: Testing framework
- **React Testing Library**: Component testing

## Vercel Deployment

The app is deployed to Vercel. Visit <https://file-management-app-henna.vercel.app/>
