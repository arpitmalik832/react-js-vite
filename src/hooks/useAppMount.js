/**
 * Custom hook to be called on App mount.
 * @file The file is saved as `useAppMount.js`.
 */
import {
  useInitAxios,
  useTheme,
} from '@arpitmalik832/react-js-rollup-monorepo-library';

/**
 * Custom hook to initialize theme and axios.
 * @example
 * useAppMount();
 */
function useAppMount() {
  useTheme();
  useInitAxios();
}

export default useAppMount;
