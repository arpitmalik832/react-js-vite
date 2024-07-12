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
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
  css: {
    postcss: {
      plugins: [postcssPresetEnvPlugin, autoprefixerPlugin],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/index.scss";`,
      },
    },
  },
  build: {
    outDir: 'build',
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
