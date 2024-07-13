import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Button from './index';
import appReducer from '../../../redux/slices/appSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

const story = {
  title: 'Components/Atoms/Button',
  component: Button,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

const Template = () => <Button />;
const Default = Template.bind({});

export default story;
export { Default };
