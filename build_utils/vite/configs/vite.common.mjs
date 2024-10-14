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
import stripCustomWindowVariablesPlugin from '../customPlugins/stripCustomWindowVariablesPlugin.mjs';
import pkg from '../../../package.json' with { type: 'json' };
import svgrConfig from '../../../svgr.config.mjs';

const config = {
  plugins: [
    react(),
    svgr({
      svgrOptions: svgrConfig,
      include: '**/*.svg',
    }),
    [ENVS.PROD, ENVS.BETA].includes(process.env.APP_ENV) &&
      stripCustomWindowVariablesPlugin({
        variables: ['abc'],
      }),
    process.env.IS_STORYBOOK !== 'true' && copyRedirectsPlugin(),
    process.env.IS_STORYBOOK !== 'true' && preload(),
    compression({
      deleteOriginFile: false,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    generateChunkManifestPlugin(),
    VitePWA({
      strategies: 'injectManifest',
      injectRegister: false,
      injectManifest: false,
      manifest: {
        name: 'React JS Vite Starter',
        short_name: 'React JS Vite',
        description: 'A starter template for React JS with Vite',
        theme_color: '#ffffff',
      },
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
            const directories = id.split('node_modules/');
            if (directories.length > 1) {
              const packageName = directories[1].split('/')[0];
              return `vendor-${packageName}`;
            }
            return 'vendor';
          }
        },
      },
    },
    treeshake: true,
  },
};

export default config;
