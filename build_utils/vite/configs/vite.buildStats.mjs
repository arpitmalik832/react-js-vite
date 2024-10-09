/**
 * This is the Vite visualizer configuration file.
 * @file This file is saved as `vite.visualizer.js`.
 */
import buildStats from '../customPlugins/buildStatsPlugin.mjs';

const timestamp = new Date().toISOString().replace(/:/g, '-');

const config = {
  plugins: [buildStats(`distInfo/main/buildStats/${timestamp}/index.json`)],
};

export default config;
