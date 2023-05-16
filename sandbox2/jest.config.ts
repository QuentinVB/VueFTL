import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  //setupFilesAfterEnv: ['./tests/bootstrap.ts'],
  globalSetup: './tests/bootstrap.ts',
  //globalTeardown: './tests/teardown.ts'
};
export default config;