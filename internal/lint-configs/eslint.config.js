export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/.git/**', '**/coverage/**', '**/.next/**']
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'comma-dangle': ['error', 'never'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never']
    }
  },
  {
    // JavaScript/TypeScript基础规则
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: require('eslint-plugin-import')
    },
    rules: {
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc' }
      }],
      'import/no-duplicates': 'error'
    }
  },
  {
    // Vue相关规则
    files: ['**/*.vue'],
    plugins: {
      vue: require('eslint-plugin-vue')
    },
    rules: {
      // 基础规则
      'vue/multi-word-component-names': 'warn',
      'vue/no-unused-vars': 'error',
      'vue/script-setup-uses-vars': 'error',

      // 组件定义与样式
      'vue/component-definition-name-casing': ['error', 'PascalCase'],
      'vue/component-tags-order': [
        'error',
        {
          order: ['script', 'template', 'style']
        }
      ],
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' }
        }
      ],

      // 模板规则
      'vue/html-self-closing': [
        'error',
        {
          html: { void: 'always', normal: 'always', component: 'always' }
        }
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT'
          ]
        }
      ],

      // Composition API规则
      'vue/no-setup-props-destructure': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-emits-declaration': ['error', 'type-based'],

      // 最佳实践
      'vue/no-v-html': 'warn',
      'vue/no-unused-refs': 'error',
      'vue/no-unused-properties': 'error',
      'vue/no-expose-after-await': 'error',
      'vue/prefer-import-from-vue': 'error',
      'vue/no-deprecated-v-on-native-modifier': 'error',
      'vue/require-explicit-emits': 'error',
      'vue/require-prop-types': 'error',
      'vue/require-default-prop': 'error'
    }
  },
  {
    // TypeScript特定规则
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface']
    }
  },
  {
    // React相关规则
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      'react': require('eslint-plugin-react'),
      'react-hooks': require('eslint-plugin-react-hooks')
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
]
