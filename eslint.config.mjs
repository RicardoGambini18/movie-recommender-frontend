import eslint from '@eslint/js'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierPlugginRecommended from 'eslint-plugin-prettier/recommended'
import promisePlugin from 'eslint-plugin-promise'
import sonarjsPlugin from 'eslint-plugin-sonarjs'
import unicornPlugin from 'eslint-plugin-unicorn'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const eslintConfig = defineConfig([
  globalIgnores([
    'out/**',
    'build/**',
    '.next/**',
    'next-env.d.ts',
    'next.config.ts',
    'node_modules/**',
    'eslint.config.mjs',
    'postcss.config.mjs',
    'prettier.config.js',
  ]),
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  ...nextVitals,
  ...nextTs,
  prettierPlugginRecommended,
  promisePlugin.configs['flat/recommended'],
  sonarjsPlugin.configs.recommended,
  unicornPlugin.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'react-hooks/incompatible-library': 'off',
      'unicorn/no-array-sort': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
])

export default eslintConfig
