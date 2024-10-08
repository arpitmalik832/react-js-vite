import svgrConfig from '../svgr.config.mjs';

const CONFIG_TYPE = {
  PRODUCTION: 'PRODUCTION',
  DEVELOPMENT: 'DEVELOPMENT',
};

export default {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
  ],
  framework: '@storybook/react-webpack5',
  webpackFinal: async (config, { configType }) => {
    // adding handling for js files
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    });

    // adding handling for svg files
    const fileLoaderRule = config.module.rules.find(
      rule => !Array.isArray(rule.test) && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: svgrConfig }, 'url-loader'],
    });

    // adding handling for sass and scss files
    config.module.rules.push({
      test: /\.(scss|sass)$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: false,
            modules: {
              mode: 'local',
              localIdentName:
                configType === CONFIG_TYPE.PRODUCTION
                  ? '[hash:base64:5]'
                  : '[name]-[local]-[hash:base64:5]',
            },
            sourceMap: configType === CONFIG_TYPE.DEVELOPMENT,
            importLoaders: 1,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: configType === CONFIG_TYPE.DEVELOPMENT,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: configType === CONFIG_TYPE.DEVELOPMENT,
          },
        },
      ],
    });

    // adding code splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024, // 30KB
        maxSize: 256 * 1024, // 1MB
        cacheGroups: {
          stories: {
            test: /\.(stories|story)\.[tj]sx?$/,
            name: 'stories',
            chunks: 'all',
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },
};
