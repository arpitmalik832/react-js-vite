export default {
  '{src,public,build_utils,cypress,.}/**/*.{js,ts,jsx}': [
    'npm run fix-js',
    'npm run fix-prettier',
  ],
  '{src,public,build_utils,cypress,.}/**/*.{css,scss}': [
    'npm run fix-css',
    'npm run fix-prettier',
  ],
  '{src,public,build_utils,.}/**/*.json': [
    'npm run fix-prettier --parser json',
  ],
  '{src,public,build_utils,.}/**/*.md': [
    'npm run fix-prettier --parser markdown',
  ],
};
