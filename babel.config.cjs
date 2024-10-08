/**
 * Contains the babel configuration for the library.
 * @file This file is saved as `babel.config.cjs`.
 */
module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-syntax-import-attributes',
    '@babel/plugin-proposal-optional-chaining',
  ],
};
