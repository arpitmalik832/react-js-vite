/**
 * This is the Vite visualizer configuration file.
 * @file This file is saved as `vite.visualizer.js`.
 */
import buildStats from '../customPlugins/buildStatsPlugin.mjs';

const timestamp = new Date().toISOString().replace(/:/g, '-');
const path =
  process.env.IS_STORYBOOK === 'true'
    ? `distInfo/storybook/${process.env.APP_ENV}/buildStats`
    : `distInfo/${process.env.APP_ENV}/buildStats`;

const config = {
  plugins: [buildStats(`${path}/${timestamp}.json`)],
};

export default config;
