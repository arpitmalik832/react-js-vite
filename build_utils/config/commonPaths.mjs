/**
 * Common paths for the project build.
 * @file The file is saved as `build_utils/config/commonPaths.js`.
 */
import { resolve, join } from 'path';

const PROJECT_ROOT = resolve();

const projectRootPath = PROJECT_ROOT;
const entryPath = join(PROJECT_ROOT, 'index.html');
const outputPath = join(PROJECT_ROOT, 'dist');
const chunkManifestPath = join(outputPath, 'chunk-manifest.json');

export { projectRootPath, entryPath, outputPath, chunkManifestPath };
