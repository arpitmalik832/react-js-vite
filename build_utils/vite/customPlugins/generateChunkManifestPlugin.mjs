/**
 * Custom plugin to generate a chunk manifest.
 * @file The file is saved as `build_utils/vite/customPlugins/generateChunkManifestPlugin.js`.
 */
import { writeFileSync } from 'fs';

import {
  chunkManifestPath,
  storybookChunkManifestPath,
} from '../../config/commonPaths.mjs';

/**
 * Custom plugin to generate a chunk manifest.
 * @returns {object} Vite plugin configuration object.
 * @example
 * // Add this plugin to the Vite plugins array
 * plugins: [generateChunkManifestPlugin()]
 */
function generateChunkManifestPlugin() {
  return {
    name: 'generate-chunk-manifest',
    writeBundle(options, bundle) {
      const manifest = {};
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.isEntry || chunk.isDynamicEntry) {
          manifest[fileName] = chunk.imports || [];
        }
      }
      writeFileSync(
        process.env.IS_STORYBOOK === 'true'
          ? storybookChunkManifestPath
          : chunkManifestPath,
        JSON.stringify(manifest, null, 2),
      );
    },
  };
}

export default generateChunkManifestPlugin;
