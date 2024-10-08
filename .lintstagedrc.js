const config = {
  '**/*.{mjs,cjs,js,jsx,mdx,md}': [
    'yarn lint-js:fix',
    'yarn prettier:fix "**/*.{mjs,cjs,js,jsx,mdx,md}"',
  ],
  '**/*.{css,scss}': [
    'yarn lint-css:fix',
    'yarn prettier:fix  "**/*.{css,scss}"',
  ],
  '**/*.json': ['yarn prettier:fix "**/*.json"'],
};

export default config;
