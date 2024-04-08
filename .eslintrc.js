module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js', 'commitlint.config.js'],
  plugins: ['@typescript-eslint', 'import'],
  extends: 'standard-with-typescript',
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    createDefaultProgram: true
  },
  settings: {
    'import/internal-regex': '^@app/'
  },
  rules: {
    'no-prototype-builtins': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/semi': 'off',
    'import/newline-after-import': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-len': [
      'error',
      {
        code: 140
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/src/*', '.*', '../*', './*'],
            message: 'Please add @app'
          }
        ]
      }
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
        allowAny: true,
        allowNullish: true
      }
    ],
    'import/no-relative-parent-imports': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index']
      }
    ],
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: {
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?'
          },
          Function: {
            message: 'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.'
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?'
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?'
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?'
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?'
          }
        }
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.singleton.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-empty-function': 'off'
      }
    },
    {
      files: ['**/functions/*.ts'],
      rules: {
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off'
      }
    },
    {
      files: ['test/**/*.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-call': 'off'
      }
    }
  ]
}
