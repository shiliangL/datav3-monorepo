import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharedConfig from '@dva3/lint-configs/eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 导入共享的ESLint配置
// const sharedConfig = (await import('../../internal/lint-configs/eslint.config.js')).default;
console.log(sharedConfig,'=sharedConfig=');

export default [
  // ...sharedConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      }
    }
  }
];