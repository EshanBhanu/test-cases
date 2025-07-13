# Test Cases - React + TypeScript + Vite + Jest

A modern React application built with TypeScript, Vite, and comprehensive Jest testing setup. This project demonstrates best practices for component testing, custom hook testing, and authentication workflow testing using Jest and React Testing Library.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <https://github.com/EshanBhanu/test-cases.git>
cd test-cases
```

2. Install dependencies:

```bash
npm install
```


3. Run tests:

```bash
npm test
npm run test:watch <-recommended!
```


## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Button.tsx       # Button component with variants
│   ├── IconButton.tsx   # Icon-based button component
│   └── SearchBar.tsx    # Search input component
├── hooks/               # Custom React hooks
│   └── useAuth.tsx      # Authentication hook
├── context/             # React context providers
│   └── AuthContext.tsx  # Authentication context
├── utils/               # Utility functions and schemas
│   └── authSchema.ts    # Zod validation schemas
└── tests/               # Test files
    ├── setup.ts         # Test environment setup
    ├── Button.test.tsx  # Button component tests
    ├── SearchBar.test.tsx # SearchBar component tests
    ├── useAuth.test.tsx # useAuth hook tests
    └── authSchema.test.ts # Schema validation tests
```

## 🧪 Testing Framework

This project uses **Jest** as the primary testing framework along with **React Testing Library** for component testing. The testing setup includes:

### Jest Configuration

- **TypeScript Support**: Full TypeScript integration with `ts-jest`
- **ES Modules**: Native ESM support for modern JavaScript
- **JSX Processing**: Babel transformation for React components
- **CSS Modules**: Mock CSS imports with `identity-obj-proxy`
- **JSDOM Environment**: Browser-like environment for component testing

### Testing Libraries Used

- **Jest v30.0.3**: Core testing framework with modern features
- **React Testing Library v16.3.0**: Component testing utilities
- **Jest DOM**: Custom Jest matchers for DOM testing
- **User Event**: Realistic user interaction simulation

### Key Testing Patterns

1. **Component Testing**: Testing UI components in isolation
2. **Hook Testing**: Custom hook testing with `renderHook`
3. **Mock Functions**: Comprehensive mocking for external dependencies
4. **Context Testing**: Testing React Context providers and consumers
5. **Schema Validation**: Testing Zod schemas with edge cases

## 🏃‍♂️ Available Commands

### Testing

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD (optimized for continuous integration)
npm run test:ci

# Run tests with debugging information
npm run test:debug

# Run specific test file
npm test Button.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="should render"
```

## 🔧 Jest Configuration Highlights

The project uses a comprehensive Jest configuration (`jest.config.cjs`) that includes:

```javascript
module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
        ],
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
};
```

## 📋 Test Examples

### Component Testing

```typescript
// Testing button component with user interactions
it("should handle click events", async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  await user.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Hook Testing

```typescript
// Testing custom useAuth hook
it("should return auth context when available", () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.isAuthenticated).toBe(true);
  expect(result.current.user).toBeDefined();
});
```

### Mock Implementation

```typescript
// Mocking React's useContext for isolated testing
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));
```

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 7.0.4 for fast development
- **Styling**: Tailwind CSS 4.1.11
- **State Management**: React Context + Custom Hooks
- **HTTP Client**: Axios 1.10.0
- **Routing**: React Router DOM 7.6.3
- **Validation**: Zod 4.0.5
- **Testing**: Jest 30.0.3 + React Testing Library 16.3.0
- **Data Fetching**: TanStack Query 5.82.0

## 📊 Test Coverage

Run `npm run test:coverage` to generate a detailed coverage report. The project aims for:

- **Statements**: >90%
- **Branches**: >85%
- **Functions**: >90%
- **Lines**: >90%

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Write tests for your changes
4. Ensure all tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## 📝 Testing Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Descriptive Test Names**: Test names should clearly describe the expected behavior
3. **Arrange-Act-Assert**: Structure tests with clear setup, execution, and verification phases
4. **Mock External Dependencies**: Keep tests isolated and predictable
5. **Test Edge Cases**: Include error scenarios and boundary conditions
6. **Maintain Test Coverage**: Aim for high coverage while focusing on meaningful tests
