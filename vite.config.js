/**
 * This is the Vite configuration file.
 * @file This file is saved as `vite.config.js`.
 */
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import fs from 'fs';
import path from 'path';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';
import preload from 'vite-plugin-preload';
import { VitePWA } from 'vite-plugin-pwa';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Read package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// Custom plugin to generate chunk manifest
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
      const manifestPath = path.join(options.dir, 'chunk-manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    },
  };
}

// Custom plugin to copy _redirects file
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
        const source = path.resolve(dirname, 'public', 'netlify', '_redirects');
        const destination = path.resolve(dirname, 'build', '_redirects');
        if (fs.existsSync(source)) {
          fs.copyFileSync(source, destination);
        }
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
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
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnvPlugin, autoprefixerPlugin],
    },
  },
  build: {
    outDir: 'build',
    copyPublicDir: false,
    minify: ['production', 'beta'].includes(process.env.NODE_ENV),
    sourcemap: !['production', 'beta'].includes(process.env.NODE_ENV),
    rollupOptions: {
      input: {
        main: path.resolve(dirname, 'index.html'),
      },
      output: {
        entryFileNames: `${pkg.version}/js/[name].[hash].js`,
        chunkFileNames: `${pkg.version}/js/[name].[hash].js`,
        assetFileNames: assetInfo => {
          if (assetInfo.name.endsWith('.css')) {
            return `${pkg.version}/css/[name].[hash].[extname]`;
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
