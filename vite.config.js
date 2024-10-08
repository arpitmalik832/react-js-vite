/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';
import preload from 'vite-plugin-preload';
import { VitePWA } from 'vite-plugin-pwa';

import { ENVS } from './build_utils/config/index.mjs';
import { entryPath, outputPath } from './build_utils/config/commonPaths.mjs';
import generateChunkManifestPlugin from './build_utils/vite/customPlugins/generateChunkManifestPlugin.mjs';
import copyRedirectsPlugin from './build_utils/vite/customPlugins/copyRedirectsNetlifyPlugin.mjs';
import pkg from './package.json' with { type: 'json' };
import { ERR_NO_ENV_FLAG } from './build_utils/config/logs.mjs';

/**
 * Get the Vite configuration based on the environment.
 * @returns {object} The Vite configuration object.
 * @throws {Error} Throws an error if APP_ENV is not defined.
 * @example
 * // To get the configuration
 * const config = getConfig();
 */
function getConfig() {
  if (!process.env.APP_ENV) {
    throw new Error(ERR_NO_ENV_FLAG);
  }

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [
      react(),
      compression({
        deleteOriginFile: false,
        algorithm: 'brotliCompress',
        ext: '.br',
      }),
      generateChunkManifestPlugin(),
      copyRedirectsPlugin(),
      preload(),
      VitePWA({
        strategies: 'injectManifest',
        injectRegister: false,
        injectManifest: false,
      }),
    ],
    define: {
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    },
    esbuild: {
      drop: process.env.APP_ENV === ENVS.PROD ? ['console', 'debugger'] : [],
    },
    css: {
      postcss: {
        plugins: [postcssPresetEnvPlugin, autoprefixerPlugin],
      },
    },
    build: {
      outDir: outputPath,
      copyPublicDir: false,
      minify: [ENVS.PROD, ENVS.BETA].includes(process.env.APP_ENV),
      sourcemap: ![ENVS.PROD, ENVS.BETA].includes(process.env.APP_ENV),
      rollupOptions: {
        input: {
          main: entryPath,
        },
        output: {
          entryFileNames: `${pkg.version}/js/[name].[hash].js`,
          chunkFileNames: `${pkg.version}/js/[name].[hash].js`,
          assetFileNames: assetInfo => {
            if (assetInfo.name.endsWith('.css')) {
              return `${pkg.version}/css/[name].[hash].[ext]`;
            }
            return `${pkg.version}/assets/[name].[hash].[ext]`;
          },
          // eslint-disable-next-line consistent-return
          manualChunks: id => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  });
}

export default getConfig;
