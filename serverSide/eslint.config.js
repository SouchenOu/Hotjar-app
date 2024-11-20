import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
];
