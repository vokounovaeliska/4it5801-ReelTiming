module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: ['react-app', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort', 'import', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ],
      },
    },
    {
      files: ['*.jsx', '*.tsx'],
      rules: {
        'react/no-is-mounted': 'warn',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Packages.
              ['^(react|react-dom)(/.*|$)', '^(next)(/.*|$)', '^@?\\w'],
              // Project scope shared packages
              ['^(@(backend|frontend|shared))(/.*|$)'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              ['^'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.s?css$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        'react/no-unused-prop-types': 'warn',
        'react/no-unused-state': 'warn',
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
      },
    ],
  },
};
