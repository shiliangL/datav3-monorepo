import { fileURLToPath } from 'node:url'
import eslintConfig from '@dva3/lint-configs/eslint'

export default [
  ...eslintConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
        project: ['./tsconfig.json'],
        extraFileExtensions: ['.vue']
      }
    }
  }
]