import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { log } from '../utils/commonUtils';

const useBackPress = () => {
  const { stack } = useSelector(state => state.navigation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack());
    } else {
      navigate(-1);
    }
  }, [stack]);

  window.backPress = handleBackPress;

  useEffect(() => {
    beforeUnload.subscribe(() => {
      log('😬 user back clicked!!');
    });

    return () => {
      beforeUnload.unSubscribe();
    };
  }, []);

  const push = callback => {
    dispatch(pushStack(callback));
  };

  const pop = () => {
    handleBackPress();
  };

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack());
    }
  }, [stack]);

  return { stack, push, pop, clear };
};

export default useBackPress;
