import { ENVS } from '../configs/app';
import devStore from './store/store.dev';
import prodStore from './store/store.prod';

const store = process.env.NODE_ENV === ENVS.PROD ? prodStore : devStore;

export default store;
