/**
 * Custom plugin to copy _redirects file.
 * @file The file is saved as `build_utils/vite/customPlugins/copyRedirectsNetlifyPlugin.js`.
 */
import { join } from 'path';
import { existsSync, copyFileSync } from 'fs';

import { outputPath, projectRootPath } from '../../config/commonPaths.mjs';

/**
 * Custom plugin to copy _redirects file.
 * @returns {object} Vite plugin configuration object.
 * @example
 * // Add this plugin to the Vite plugins array
 * plugins: [copyRedirectsPlugin()]
 */
function copyRedirectsPlugin() {
  return {
    name: 'copy-redirects',
    writeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        const source = join(projectRootPath, 'public', 'netlify', '_redirects');
        const destination = join(outputPath, '_redirects');
        if (existsSync(source)) {
          copyFileSync(source, destination);
        }
      },
    },
  };
}

export default copyRedirectsPlugin;
