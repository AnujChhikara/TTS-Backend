import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node, // ✅ this tells ESLint you're using Node.js
    },
    plugins: { js },
    rules: {}, // optional custom rules
    extends: ['plugin:@eslint/js/recommended'],
  },
])
