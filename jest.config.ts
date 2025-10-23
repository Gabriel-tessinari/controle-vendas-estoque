export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/controllers/**/*.ts',
    'src/**/usecases/**/*.ts',
    'src/**/mappers/**/*.ts',
    'src/**/utils/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
  ],
};
