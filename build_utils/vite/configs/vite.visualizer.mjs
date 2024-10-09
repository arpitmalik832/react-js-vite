/**
 * This is the Vite visualizer configuration file.
 * @file This file is saved as `vite.visualizer.js`.
 */
import { visualizer } from 'rollup-plugin-visualizer';

const timestamp = new Date().toISOString().replace(/:/g, '-');

const config = {
  plugins: [
    visualizer({
      filename: `distInfo/main/visualizers/${timestamp}/sunburst.html`,
      template: 'sunburst',
    }),
    visualizer({
      filename: `distInfo/main/visualizers/${timestamp}/list.html`,
      template: 'list',
    }),
    visualizer({
      filename: `distInfo/main/visualizers/${timestamp}/flamegraph.html`,
      template: 'flamegraph',
    }),
    visualizer({
      filename: `distInfo/main/visualizers/${timestamp}/network.html`,
      template: 'network',
    }),
    visualizer({
      filename: `distInfo/main/visualizers/${timestamp}/raw-data.html`,
      template: 'raw-data',
    }),
    visualizer({
      filename: `distInfo/main/visualizers/${timestamp}/treemap.html`,
      template: 'treemap',
    }),
  ],
};

export default config;
