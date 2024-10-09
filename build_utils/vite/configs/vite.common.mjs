/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';
import preload from 'vite-plugin-preload';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

import { ENVS } from '../../config/index.mjs';
import { entryPath, outputPath } from '../../config/commonPaths.mjs';
import generateChunkManifestPlugin from '../customPlugins/generateChunkManifestPlugin.mjs';
import copyRedirectsPlugin from '../customPlugins/copyRedirectsNetlifyPlugin.mjs';
import pkg from '../../../package.json' with { type: 'json' };
import svgrConfig from '../../../svgr.config.mjs';

const config = {
  plugins: [
    react(),
    svgr({
      svgrOptions: svgrConfig,
      include: '**/*.svg',
    }),
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
};

export default config;
