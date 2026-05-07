import prettier from 'eslint-plugin-prettier';
import nextTs from 'eslint-config-next/typescript';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

// ----------------------------------------------------------------------

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ── Plugins ──────────────────────────────────────────────
  {
    plugins: {
      perfectionist,
      'unused-imports': unusedImports,
      prettier,
    },
  },

  // ── Project rules (shadcn / Radix / Tailwind v4) ────────
  {
    rules: {
      // -- General --
      'no-use-before-define': 'off',
      'no-alert': 'off',
      camelcase: 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'no-nested-ternary': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      'no-restricted-exports': 'off',
      'no-promise-executor-return': 'off',
      'import/prefer-default-export': 'off',
      'prefer-destructuring': ['warn', { object: true, array: false }],

      // -- React --
      'react/prop-types': 'off',
      'react/no-children-prop': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-array-index-key': 'off',
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-no-duplicate-props': ['warn', { ignoreCase: false }],
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],

      // -- jsx-a11y --
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/control-has-associated-label': 'off',

      // -- TypeScript --
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      // -- Unused imports --
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'off',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // -- Prettier --
      'prettier/prettier': 'warn',

      // -- Perfectionist (import sorting) --
      'perfectionist/sort-exports': ['warn', { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-imports': ['warn', { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-named-exports': ['warn', { order: 'asc', type: 'line-length' }],
      'perfectionist/sort-imports': [
        'warn',
        {
          order: 'asc',
          type: 'line-length',
          newlinesBetween: 1,
          groups: [
            'style',
            'type',
            ['builtin', 'external'],
            'custom-radix',
            'custom-hooks',
            'custom-lib',
            'internal',
            'custom-components',
            'custom-types',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          customGroups: [
            { groupName: 'custom-radix', elementNamePattern: '^@radix-ui/' },
            { groupName: 'custom-hooks', elementNamePattern: '^@/hooks/' },
            { groupName: 'custom-lib', elementNamePattern: '^@/lib/' },
            { groupName: 'custom-types', elementNamePattern: '^@/types/' },
            { groupName: 'custom-components', elementNamePattern: '^@/components/' },
          ],
          internalPattern: ['^@/'],
        },
      ],
    },
  },

  // ── Ignored paths ───────────────────────────────────────
  globalIgnores(['.next/**', 'out/**', 'build/**', 'dist/**', 'node_modules/**', 'next-env.d.ts']),
]);

export default eslintConfig;
