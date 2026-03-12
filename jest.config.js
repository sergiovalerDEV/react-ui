export default {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'jsdom',

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.module\\.(scss|sass|css)$': '<rootDir>/src/__mocks__/styleMock.cjs',
    },

    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            useESM: true,
        }],
    },

    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/index.ts',
    ],

    coverageReporters: ['text', 'lcov', 'clover'],
    coverageDirectory: 'coverage',

    testMatch: [
        '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
    ],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};