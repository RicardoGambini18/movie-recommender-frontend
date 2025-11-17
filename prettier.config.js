/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  requirePragma: false,
  proseWrap: 'never',
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto',
  importOrder: ['<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  overrides: [
    {
      files: ['*.json'],
      options: {
        trailingComma: 'none',
      },
    },
  ],
}

export default config
