import useInitAxios from './useInitAxios';
import useTheme from './useTheme';

const useAppMount = () => {
  useTheme();
  useInitAxios();
};

export default useAppMount;
