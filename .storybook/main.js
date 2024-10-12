import { mergeConfig } from 'vite';

import { ENVS } from '../build_utils/config/index.mjs';

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config, { configType }) {
    if (!process.env.BE_ENV) {
      throw new Error('please pass the BE_ENV');
    }

    return mergeConfig(config, {
      mode: process.env.BE_ENV || ENVS.PROD,
      optimizeDeps: {
        include: ['@storybook/addon-essentials', '@storybook/addon-links'],
      },
    });
  },
};
