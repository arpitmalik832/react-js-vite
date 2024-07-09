import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import fs from 'fs';
import path from 'path';
import postcssPresetEnvPlugin from 'postcss-preset-env';
import autoprefixerPlugin from 'autoprefixer';
import preload from 'vite-plugin-preload';

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
    preload(),
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
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            if (id.includes('react')) {
              return 'react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
